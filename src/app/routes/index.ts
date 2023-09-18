import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OrderRoutes } from "../modules/order/order.route";
import { ProductRoutes } from "../modules/product/product.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
