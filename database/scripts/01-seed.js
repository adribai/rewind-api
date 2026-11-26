// Datos iniciales de Rewind API.
// Mongo ejecuta este script automáticamente SOLO la primera vez que arranca con el volumen vacío
// (carpeta /docker-entrypoint-initdb.d). Para volver a ejecutarlo: docker compose down -v && docker compose up
//
// Se ejecuta con mongosh dentro del contenedor: "db" es la base de MONGO_INITDB_DATABASE.
//
// Todos los usuarios tienen la contraseña "supersecreta".
// Aquí no hay bcrypt, así que guardamos directamente su hash (generado con bcrypt.hash("supersecreta", 10)).
const PASSWORD_HASH = "$2b$10$ji280zdAqkxuv5tjkCmq0uKZ3Xp.eAUOGKoB7kCJ3IGtvsh434HZK";

const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

// ─── Usuarios (colección "users", modelo User) ───────────────────────────────

const admin = { _id: new ObjectId(), userName: "admin", userEmail: "admin@rewind.dev", userRole: "admin" };
const ana = { _id: new ObjectId(), userName: "ana", userEmail: "ana@ejemplo.com", userRole: "user" };
const bea = { _id: new ObjectId(), userName: "bea", userEmail: "bea@ejemplo.com", userRole: "user" };
const carlos = { _id: new ObjectId(), userName: "carlos", userEmail: "carlos@ejemplo.com", userRole: "user" };

db.users.insertMany(
  [admin, ana, bea, carlos].map((user) => ({
    ...user,
    userPassword: PASSWORD_HASH,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
    __v: 0,
  })),
);

// ─── Series (colección "series", modelo Serie) ───────────────────────────────

/** Una temporada EMBEBIDA: va dentro de la serie, con su propio _id (como hace Mongoose).
 *  seasonNumber es el número de ESTA temporada (1, 2, 3...), no cuántas tiene la serie. */
const season = (seasonNumber, numEpisodes, title) => ({
  _id: new ObjectId(),
  seasonNumber,
  ...(title ? { seasonTitle: title } : {}),
  seasonNumEpisodes: numEpisodes,
});

/** Una serie con sus temporadas embebidas y varios géneros */
const serie = (data, seasons, days = 20) => ({
  _id: new ObjectId(),
  ...data,
  seasons,
  available: true, // borrado lógico: false = eliminada del catálogo
  createdAt: daysAgo(days),
  updatedAt: daysAgo(days),
  __v: 0,
});

const dark = serie(
  {
    serieTitle: "Dark",
    serieGenre: ["drama", "aventura"],
    serieSinopsis: "La desaparición de un niño destapa los secretos de cuatro familias y un misterio que atraviesa el tiempo.",
    serieYear: 2017,
  },
  [season(1, 10, "Secretos"), season(2, 8, "Mentiras"), season(3, 8, "Origen")],
  20,
);

const lost = serie(
  {
    serieTitle: "Lost",
    serieGenre: ["aventura", "drama"],
    serieSinopsis: "Los supervivientes de un accidente aéreo intentan sobrevivir en una isla llena de misterios.",
    serieYear: 2004,
  },
  [season(1, 25), season(2, 24), season(3, 23)],
  19,
);

const friends = serie(
  {
    serieTitle: "Friends",
    serieGenre: ["comedia", "romance"],
    serieSinopsis: "Seis amigos viven sus amores, trabajos y problemas en Nueva York.",
    serieYear: 1994,
  },
  [season(1, 24), season(2, 24)],
  18,
);

const casaTerror = serie(
  {
    serieTitle: "La Casa del Terror",
    serieGenre: ["terror"],
    serieSinopsis: "Una familia se muda a una casa que guarda un pasado oscuro.",
    serieYear: 2018,
  },
  [season(1, 10)],
  17,
);

// Serie con borrado lógico: el admin la "eliminó" del catálogo (available: false).
// No debería salir en GET /series, pero sigue en las listas de quien ya la tenía.
const retired = {
  ...serie(
    {
      serieTitle: "Serie Retirada",
      serieGenre: ["accion"],
      serieSinopsis: "Una serie que ya no está en el catálogo.",
      serieYear: 2010,
    },
    [season(1, 12)],
    16,
  ),
  available: false,
  updatedAt: daysAgo(2),
};

db.series.insertMany([dark, lost, friends, casaTerror, retired]);

// ─── Lista personal (colección "listitems", modelo Listitem) ─────────────────

/** Un elemento de lista: user y serie van REFERENCIADOS (solo su _id) */
const listItem = (user, serieDoc, listStatus, days = 5) => ({
  user: user._id,
  serie: serieDoc._id,
  listStatus,
  addedAt: daysAgo(days),
  __v: 0,
});

// Índice único (user, serie): cada pareja aparece una sola vez.
db.listitems.insertMany([
  listItem(ana, dark, "watching", 10),
  listItem(ana, friends, "watched", 9),
  listItem(ana, lost, "pending", 3),
  listItem(bea, dark, "watched", 8),
  listItem(bea, retired, "watching", 7), // serie retirada: sigue en su lista
  listItem(carlos, casaTerror, "pending", 4),
  listItem(carlos, lost, "watching", 2),
]);

