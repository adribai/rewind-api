import { env } from "./config/env.js";
import express from "express";
import router from "./routers/router.js"
import connectDB from "./config/db.js";

const app = express();
app.use(express.json()); //recibir peticiones en json

app.use("/",router); // en la ruta /, usa router

await connectDB();

app.listen(3000, ()=>{
    console.log(`app en marcha: http://localhost:${env.APP_PORT}/api`)
});
