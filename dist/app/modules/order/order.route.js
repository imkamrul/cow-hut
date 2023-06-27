"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../middleware/Auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_constant_1 = require("../admin/admin.constant");
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post("/", (0, Auth_1.auth)(user_constant_1.role[0]), (0, validateRequest_1.default)(order_validation_1.OrderZodSchema), order_controller_1.createOrder);
router.get("/", (0, Auth_1.auth)(...admin_constant_1.adminRole, ...user_constant_1.role), order_controller_1.allOrder);
router.get("/:id", (0, Auth_1.auth)(...admin_constant_1.adminRole, ...user_constant_1.role), order_controller_1.getSingleOrder);
exports.OrderRoutes = router;
