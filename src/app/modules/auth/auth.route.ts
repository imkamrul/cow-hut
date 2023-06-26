import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { CreateLogInZodSchema } from "../admin/admin.validation";
import { createUser, logInUser, refreshToken } from "../user/user.controller";
import { CreateUserZodSchema } from "../user/user.validation";

const router = express.Router();
router.post("/signup", validateRequest(CreateUserZodSchema), createUser);
router.post("/login", validateRequest(CreateLogInZodSchema), logInUser);
router.post(
  "/refresh-token",
  validateRequest(CreateLogInZodSchema),
  refreshToken
);
export const AuthRoutes = router;
