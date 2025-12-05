import { Router } from "express";
import { validateId } from "../middlewares/validateId";
import { getAllUsers, getUserById, getUsersCount, searchUsersByFilters } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/count", getUsersCount)
router.get("/search", searchUsersByFilters)
router.get("/:id", validateId, getUserById)

// router.post("/create", createNewUser)

export default router;