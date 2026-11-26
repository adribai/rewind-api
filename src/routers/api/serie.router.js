import {Router} from "express";
import serieController from "../../controllers/serie/serie.api.controller.js";


const router = Router();

router.post("/",serieController.create);
router.get("/", serieController.getAll)
router.get("/:id", serieController.getById);
router.put("/:id",serieController.update);
router.patch("/:id", serieController.modify);
router.delete("/:id", serieController.remove);


export default router;
