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
exports.getAllProduct = exports.bulkDeleteProduct = exports.generateDummyData = exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.createProduct = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const pagination_1 = require("../../common/pagination");
const pick_1 = __importDefault(require("../../common/pick"));
const response_1 = __importDefault(require("../../common/response"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const product_constat_1 = require("./product.constat");
const product_service_1 = require("./product.service");
exports.createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img_url;
    const userData = req.body;
    const result = yield (0, product_service_1.saveProduct)(userData, image);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product save successfully",
        data: result,
    });
}));
exports.getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, product_service_1.getSingleProduct)(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product retrieved successfully",
        data: result,
    });
}));
exports.deleteProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    const result = yield (0, product_service_1.deleteProduct)(id, user);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product deleted successfully",
        data: result,
    });
}));
exports.updateProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const user = req.user;
    const image = (_b = req.files) === null || _b === void 0 ? void 0 : _b.img_url;
    const productData = req.body;
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    const result = yield (0, product_service_1.updateProduct)(id, user, productData, image);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product deleted successfully",
        data: result,
    });
}));
exports.generateDummyData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerId = String(req.query.sellerId);
    const dataNumber = String(req.query.dataNumber);
    if (!sellerId || !dataNumber)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Seller id or dataNumber is required");
    const result = yield (0, product_service_1.saveDummyProducts)(dataNumber, sellerId);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `${dataNumber} Product save successfully`,
        data: result,
    });
}));
exports.bulkDeleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const result = yield (0, product_service_1.multipleProductDelete)(ids);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `${result} Product deleted successfully`,
        data: null,
    });
}));
exports.getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, product_constat_1.productFilterOptions);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield (0, product_service_1.findAllProduct)(filters, paginationOptions);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users retrieved successfully",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
