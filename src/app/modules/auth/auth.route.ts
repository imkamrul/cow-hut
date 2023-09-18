import express from "express";
import { auth } from "../../middleware/Auth";
import { tokenMatch } from "../../middleware/TokenMatch";
import validateRequest from "../../middleware/validateRequest";
import { role } from "./auth.constant";
import {
  bulkDeleteUser,
  createUser,
  deleteUserById,
  getAllUser,
  getProfileUser,
  logInUser,
  logOutUser,
  passwordChangeUser,
  updateProfileUser,
} from "./auth.controller";
import {
  CreateLogInZodSchema,
  CreatePasswordZodSchema,
  CreateUserZodSchema,
} from "./auth.validation";
const router = express.Router();
router.post(
  "/signup",

  validateRequest(CreateUserZodSchema),
  createUser
);

router.get("/profile/me", auth(...role), tokenMatch(), getProfileUser);
router.get("/profile", auth(role[1]), tokenMatch(), getAllUser);
router.patch("/profile/:id", auth(...role), updateProfileUser);
router.delete("/profile/:id", auth(...role), deleteUserById);

router.post("/login", validateRequest(CreateLogInZodSchema), logInUser);
router.post(
  "/password-change",
  auth(...role),
  validateRequest(CreatePasswordZodSchema),
  passwordChangeUser
);

router.post("/bulk-user-delete", auth(role[1]), bulkDeleteUser);
router.get("/logout", auth(...role), logOutUser);

export const AuthRoutes = router;
