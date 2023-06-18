import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { allOrder, createOrder } from "./order.controller";
import { OrderZodSchema } from "./order.validation";

const router = express.Router();

router.post("/", validateRequest(OrderZodSchema), createOrder);
router.get("/", allOrder);

export const OrderRoutes = router;
