import { Router } from "express";
import { signInAuth, signUpAuth } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", signInAuth)
router.post("/register", signUpAuth)

export default router;