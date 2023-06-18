import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createCow,
  deleteCowById,
  getCowById,
  getCows,
  updateCowById,
} from "./cow.controller";
import { CowZodSchema, UpdatedCowZodSchema } from "./cow.validation";
const router = express.Router();
router.post("/", validateRequest(CowZodSchema), createCow);
router.get("/", getCows);
router.get("/:id", getCowById);
router.delete("/:id", deleteCowById);
router.patch("/:id", validateRequest(UpdatedCowZodSchema), updateCowById);
export const CowRoutes = router;
