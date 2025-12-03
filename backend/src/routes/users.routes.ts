import { Router } from "express";
import { createNewUser, getAllUsers, getUserById } from "../controllers/users.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById)
router.post("/create", createNewUser)

export default router;