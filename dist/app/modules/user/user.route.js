"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.CreateUserZodSchema), user_controller_1.createUser);
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getUserById);
router.delete("/:id", user_controller_1.deleteUserById);
router.patch("/:id", (0, validateRequest_1.default)(user_validation_1.UpdateUserZodSchema), user_controller_1.updateUserById);
exports.UserRoutes = router;
