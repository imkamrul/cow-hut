"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_validation_1 = require("../admin/admin.validation");
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = require("../user/user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.CreateUserZodSchema), user_controller_1.createUser);
router.post("/login", (0, validateRequest_1.default)(admin_validation_1.CreateLogInZodSchema), user_controller_1.logInUser);
router.post("/refresh-token", (0, validateRequest_1.default)(admin_validation_1.CreateLogInZodSchema), user_controller_1.refreshToken);
exports.AuthRoutes = router;
