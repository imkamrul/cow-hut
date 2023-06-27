"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.CreateAdminZodSchema), admin_controller_1.createAdmin);
router.post("/login", (0, validateRequest_1.default)(admin_validation_1.CreateLogInZodSchema), admin_controller_1.logInAdmin);
exports.AdminRoutes = router;
