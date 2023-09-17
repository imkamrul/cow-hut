import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";

import { role } from "../auth/auth.constant";
import {
  createCow,
  deleteCowById,
  getCowById,
  getCows,
  updateCowById,
} from "./cow.controller";
import { CowZodSchema, UpdatedCowZodSchema } from "./cow.validation";
const router = express.Router();
router.post("/", auth(role[1]), validateRequest(CowZodSchema), createCow);
router.get("/", auth(...role), getCows);
router.get("/:id", auth(...role), getCowById);
router.delete("/:id", auth(role[1]), deleteCowById);
router.patch(
  "/:id",
  auth(role[1]),
  validateRequest(UpdatedCowZodSchema),
  updateCowById
);
export const CowRoutes = router;
