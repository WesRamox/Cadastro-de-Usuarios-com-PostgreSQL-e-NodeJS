import { Router } from "express";
import { createNewUser, getAllUsers } from "../controllers/users.controller";

const router = Router();

router.get("/", getAllUsers);
router.post("/create", createNewUser)

export default router;