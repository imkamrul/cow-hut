import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { adminRole } from "../admin/admin.constant";
import { role } from "../user/user.constant";
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
router.get("/", auth(...role, ...adminRole), getCows);
router.get("/:id", auth(...role, ...adminRole), getCowById);
router.delete("/:id", auth(role[1]), deleteCowById);
router.patch(
  "/:id",
  auth(role[1]),
  validateRequest(UpdatedCowZodSchema),
  updateCowById
);
export const CowRoutes = router;
