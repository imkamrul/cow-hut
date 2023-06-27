import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { adminRole } from "../admin/admin.constant";
import { role } from "./user.constant";
import {
  deleteUserById,
  getMyProfile,
  getUserById,
  getUsers,
  updateMyProfile,
  updateUserById,
} from "./user.controller";
import { UpdateUserZodSchema } from "./user.validation";
const router = express.Router();

router.get("/", auth(...adminRole), getUsers);
router.get("/my-profile", auth(...role), getMyProfile);
router.patch("/my-profile", auth(...role), updateMyProfile);
router.get("/:id", auth(...adminRole), getUserById);
router.delete("/:id", auth(...adminRole), deleteUserById);
router.patch(
  "/:id",
  auth(...adminRole),
  validateRequest(UpdateUserZodSchema),
  updateUserById
);
export const UserRoutes = router;
