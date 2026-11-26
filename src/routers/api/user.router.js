import {Router} from "express";
import userController from "../../controllers/user/user.api.controller.js";


const router = Router();

router.post("/",userController.create);
router.get("/", userController.getAll)
router.get("/:id", userController.getById);
router.put("/:id",userController.update);
router.patch("/:id", userController.modify);
router.delete("/:id", userController.remove);


export default router;
