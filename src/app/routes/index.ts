import express from "express";
import { CowRoutes } from "../modules/cow/cow.route";
import { UserRoutes } from "../modules/user/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
