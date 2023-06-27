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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.updateMyProfile = exports.updateUserById = exports.deleteUserById = exports.getMyProfile = exports.getUserById = exports.logInUser = exports.getUsers = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const response_1 = __importDefault(require("../../common/response"));
const user_service_1 = require("./user.service");
exports.createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield (0, user_service_1.saveUser)(userData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users created successfully",
        data: result,
    });
}));
exports.getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.getAllUser)();
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users retrieved successfully",
        data: result,
    });
}));
exports.logInUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logInData = req.body;
    const result = yield (0, user_service_1.UserLogIn)(logInData);
    if (!result) {
        throw new Error("Login failed");
    }
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User login successfully !",
        data: others,
    });
}));
exports.getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.getSingleUser)(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User retrieved successfully",
        data: result,
    });
}));
exports.getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user) {
        // Handle the case when req.user is null
        // For example, send an error response
        return (0, response_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: "User not authenticated",
        });
    }
    const result = yield (0, user_service_1.getSingleUser)(user.id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User retrieved successfully",
        data: result,
    });
}));
exports.deleteUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.deleteUser)(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.updateUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield (0, user_service_1.updateUser)(id, updatedData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User updated successfully",
        data: result,
    });
}));
exports.updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user) {
        return (0, response_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: "User not authenticated",
        });
    }
    const updatedData = req.body;
    const result = yield (0, user_service_1.updateUser)(user === null || user === void 0 ? void 0 : user.id, updatedData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User updated successfully",
        data: result,
    });
}));
exports.refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, user_service_1.handleRefreshToken)(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "New access token generated successfully !",
        data: result,
    });
}));
