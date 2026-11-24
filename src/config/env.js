import "dotenv/config";

const REQUIRED= ["JWT_SECRET","MONGO_HOST","MONGO_PORT","MONGO_USER","MONGO_PASSWORD","MONGO_DB"];

const getEnv = () =>{
    const missing= REQUIRED.filter((key) => !process.env[key]);
    if(missing.length>0){
        throw new Error(`Faltan variables de entorno: ${missing.join(", ")}. Revisa tu .env (mira .env.example)`);
    }

    return{
        NODE_ENV: process.env.NODE_ENV || "development",
        APP_PORT: Number(process.env.APP_PORT) || 3000,
        FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
        JWT_SECRET: process.env.JWT_SECRET,
        MONGO_HOST: process.env.MONGO_HOST,
        MONGO_PORT: Number(process.env.MONGO_PORT),
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        MONGO_DB: process.env.MONGO_DB,
        MONGO_AUTH_SOURCE: process.env.MONGO_AUTH_SOURCE || "admin",
  };
};

export const env= getEnv();