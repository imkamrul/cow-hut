import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { adminRole } from "../admin/admin.constant";
import { role } from "../user/user.constant";
import { allOrder, createOrder } from "./order.controller";
import { OrderZodSchema } from "./order.validation";

const router = express.Router();

router.post("/", auth(role[0]), validateRequest(OrderZodSchema), createOrder);
router.get("/", auth(...adminRole, role[0]), allOrder);

export const OrderRoutes = router;
