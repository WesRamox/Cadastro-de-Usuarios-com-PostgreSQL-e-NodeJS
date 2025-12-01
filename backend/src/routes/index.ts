import { Router } from "express";
import usersRoutes from "./users.routes";

const router = Router();

// Exemplo: api/users
router.use("/users", usersRoutes);

export default router;