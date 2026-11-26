import {Router} from "express";
import listitemController from "../../controllers/listitem/listitem.api.controller.js";

const router = Router();

router.post("/",listitemController.create);
router.get("/", listitemController.getAll)
router.get("/:id", listitemController.getById);
router.put("/:id",listitemController.update);
router.patch("/:id", listitemController.modify);
router.delete("/:id", listitemController.remove);


export default router;
