"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrder = exports.allOrder = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const response_1 = __importDefault(require("../../common/response"));
const order_service_1 = require("./order.service");
exports.createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const result = yield (0, order_service_1.saveOrder)(orderData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order created successfully",
        data: result,
    });
}));
exports.allOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const result = yield (0, order_service_1.getAllOrder)(user);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders retrieved successfully",
        data: result,
    });
}));
exports.getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const id = req.params.id;
    const result = yield (0, order_service_1.getSingleOrderById)(user, id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders retrieved successfully",
        data: result,
    });
}));
