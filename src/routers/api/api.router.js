import {Router} from "express";
import authRouter from "./auth.routes.js";
import listitemRouter from "./listitem.router.js";
import serieRouter from "./serie.router.js";
import userRouter from "./user.router.js";

const router = Router();

router.use("/auth", authRouter);


router.use("/listitem",listitemRouter);
router.use("/serie", serieRouter);
router.use("/user", userRouter);

export default router;