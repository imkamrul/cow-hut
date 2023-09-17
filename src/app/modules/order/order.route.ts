import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../auth/auth.constant";
import { allOrder, createOrder, getSingleOrder } from "./order.controller";
import { OrderZodSchema } from "./order.validation";

const router = express.Router();

router.post("/", auth(role[0]), validateRequest(OrderZodSchema), createOrder);
router.get("/", auth(...role), allOrder);
router.get("/:id", auth(...role), getSingleOrder);

export const OrderRoutes = router;
