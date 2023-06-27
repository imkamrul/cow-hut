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
exports.updateCowById = exports.deleteCowById = exports.getCowById = exports.getCows = exports.createCow = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const pagination_1 = require("../../common/pagination");
const pick_1 = __importDefault(require("../../common/pick"));
const response_1 = __importDefault(require("../../common/response"));
const cow_constant_1 = require("./cow.constant");
const cow_service_1 = require("./cow.service");
exports.createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const result = yield (0, cow_service_1.saveCow)(cowData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow created successfully",
        data: result,
    });
}));
exports.getCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_constant_1.cowFilterOptions);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield (0, cow_service_1.getAllCows)(filters, paginationOptions);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cows retrieved successfully",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
exports.getCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, cow_service_1.getSingleCow)(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow retrieved successfully",
        data: result,
    });
}));
exports.deleteCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield (0, cow_service_1.deleteCow)(id, userId);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow deleted successfully",
        data: result,
    });
}));
exports.updateCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const updatedData = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield (0, cow_service_1.updateCow)(id, userId, updatedData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow updated successfully",
        data: result,
    });
}));
