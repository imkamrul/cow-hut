import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
} from "./user.controller";
import { CreateUserZodSchema } from "./user.validation";
const router = express.Router();
router.post("/", validateRequest(CreateUserZodSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
export const UserRoutes = router;
