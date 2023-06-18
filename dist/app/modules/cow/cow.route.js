"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cow_controller_1 = require("./cow.controller");
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(cow_validation_1.CowZodSchema), cow_controller_1.createCow);
router.get("/", cow_controller_1.getCows);
router.get("/:id", cow_controller_1.getCowById);
router.delete("/:id", cow_controller_1.deleteCowById);
router.patch("/:id", (0, validateRequest_1.default)(cow_validation_1.UpdatedCowZodSchema), cow_controller_1.updateCowById);
exports.CowRoutes = router;
