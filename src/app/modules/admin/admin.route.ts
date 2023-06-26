import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createAdmin, logInAdmin } from "./admin.controller";
import { CreateAdminZodSchema, CreateLogInZodSchema } from "./admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(CreateAdminZodSchema),
  createAdmin
);
router.post("/login", validateRequest(CreateLogInZodSchema), logInAdmin);

export const AdminRoutes = router;
