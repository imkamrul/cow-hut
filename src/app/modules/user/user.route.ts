import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createUser } from "./user.controller";
import { CreateUserZodSchema } from "./user.validation";
const router = express.Router();
router.post("/", validateRequest(CreateUserZodSchema), createUser);
export const UserRoutes = router;
