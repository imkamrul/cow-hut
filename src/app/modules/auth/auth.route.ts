import express from "express";
import { auth } from "../../middleware/Auth";
import { tokenMatch } from "../../middleware/TokenMatch";
import validateRequest from "../../middleware/validateRequest";
import { role } from "./auth.constant";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getProfileUser,
  logInUser,
  logOutUser,
  passwordChangeUser,
  updateProfileUser,
  updateRoleStatusUser,
} from "./auth.controller";
import {
  CreateLogInZodSchema,
  CreatePasswordZodSchema,
  CreateUserZodSchema,
} from "./auth.validation";
const router = express.Router();
router.post("/signup", validateRequest(CreateUserZodSchema), createUser);
router.post("/login", validateRequest(CreateLogInZodSchema), logInUser);
router.get("/logout", auth(...role), logOutUser);
router.get("/me", auth(...role), tokenMatch(), getProfileUser);
router.get("/all-user", getAllUser);
router.post("/me", auth(...role), updateProfileUser);
router.post(
  "/profile/user-info-admin/:id",
  auth(role[1]),
  updateRoleStatusUser
);
router.post(
  "/password-change",
  auth(...role),
  validateRequest(CreatePasswordZodSchema),
  passwordChangeUser
);
router.delete("/profile/:id", auth(role[1]), deleteUserById);

export const AuthRoutes = router;
