import { Router } from "express";
import authController from "../../controllers/auth/auth.api.controller.js"
import { isAuthenticated } from "../../middlewares/auth.middleware.js"


// Documentación de estas rutas (Swagger): src/docs/auth.yaml
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me",isAuthenticated,authController.me);

export default router;
