import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { adminRole } from "../admin/admin.constant";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "./user.controller";
import { UpdateUserZodSchema } from "./user.validation";
const router = express.Router();

router.get("/", auth(...adminRole), getUsers);
router.get("/:id", auth(...adminRole), getUserById);
router.delete("/:id", auth(...adminRole), deleteUserById);
router.patch(
  "/:id",
  auth(...adminRole),
  validateRequest(UpdateUserZodSchema),
  updateUserById
);
export const UserRoutes = router;
