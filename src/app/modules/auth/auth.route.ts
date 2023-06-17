import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createUser } from "../user/user.controller";
import { CreateUserZodSchema } from "../user/user.validation";

const router = express.Router();
router.post("/signup", validateRequest(CreateUserZodSchema), createUser);

export const AuthRoutes = router;
