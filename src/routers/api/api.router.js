import {Router} from "express";
import listitemRouter from "./listitem.router.js";
import serieRouter from "./serie.router.js";
import userRouter from "./user.router.js";

const router = Router();




router.use("/listitem",listitemRouter);
router.use("/serie", serieRouter);
router.use("/user", userRouter);

export default router;