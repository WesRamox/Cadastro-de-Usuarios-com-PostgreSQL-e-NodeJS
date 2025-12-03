import { Router } from "express";
import { validateId } from "../middlewares/validateId";
import { createNewUser, getAllUsers, getUserById, getUsersCount, searchUsersByFilters } from "../controllers/users.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/count", getUsersCount)
router.get("/search", searchUsersByFilters)
router.get("/:id", validateId, getUserById)

router.post("/create", createNewUser)

export default router;