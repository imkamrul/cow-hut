import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "./user.controller";
import { CreateUserZodSchema, UpdateUserZodSchema } from "./user.validation";
const router = express.Router();
router.post("/", validateRequest(CreateUserZodSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.patch("/:id", validateRequest(UpdateUserZodSchema), updateUserById);
export const UserRoutes = router;
