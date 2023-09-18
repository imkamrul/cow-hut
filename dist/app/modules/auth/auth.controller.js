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
exports.bulkDeleteUser = exports.getAllUser = exports.deleteUserById = exports.updateProfileUser = exports.getProfileUser = exports.passwordChangeUser = exports.logOutUser = exports.logInUser = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const pagination_1 = require("../../common/pagination");
const pick_1 = __importDefault(require("../../common/pick"));
const response_1 = __importDefault(require("../../common/response"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const auth_constant_1 = require("./auth.constant");
const auth_service_1 = require("./auth.service");
exports.createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield (0, auth_service_1.saveUser)(userData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User registered successfully",
        data: result,
    });
}));
exports.logInUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logInData = req.body;
    const result = yield (0, auth_service_1.UserLogIn)(logInData);
    if (!result) {
        throw new Error("Login failed");
    }
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User login successfully !",
        data: result,
    });
}));
exports.logOutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, auth_service_1.updateUser)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id, { token: null });
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logout successfully !",
        data: null,
    });
}));
exports.passwordChangeUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = req.body;
    const result = yield (0, auth_service_1.updateUserPassword)((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id, data);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User password update successfully !",
        data: null,
    });
}));
exports.getProfileUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield (0, auth_service_1.getSingleUser)((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User find successfully !",
        data: result,
    });
}));
exports.updateProfileUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const updatedData = req.body;
    const image = (_d = req.files) === null || _d === void 0 ? void 0 : _d.img_url;
    const id = req.params.id;
    const user = req.user;
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    const result = yield (0, auth_service_1.updateProfileInfo)(id, user, updatedData, image);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User updated successfully",
        data: result,
    });
}));
exports.deleteUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    const result = yield (0, auth_service_1.deleteUser)(id, user);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, auth_constant_1.userFilterOptions);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield (0, auth_service_1.findAllUser)(filters, paginationOptions);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users retrieved successfully",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
exports.bulkDeleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const result = yield (0, auth_service_1.multipleUserDelete)(ids);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `${result} User deleted successfully`,
        data: null,
    });
}));
