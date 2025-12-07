import { Router } from "express";
import { validateId } from "../middlewares/validateId";
import { getAllUsers, getLastUsers, getUserById, getUsersCount, searchUsersByFilters } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/count", getUsersCount)
router.get("/last", authMiddleware, getLastUsers)
router.get("/search", authMiddleware, searchUsersByFilters)

router.get("/:id", authMiddleware, validateId, getUserById)

// router.post("/create", createNewUser)

export default router;