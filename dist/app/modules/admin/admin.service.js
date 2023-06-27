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
exports.logInUser = exports.saveAdmin = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpeer_1 = require("../../common/jwtHelpeer");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const saveAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(admin);
    return result ? yield admin_model_1.Admin.findById(result._id).select("-password") : null;
});
exports.saveAdmin = saveAdmin;
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // check user exist or not
    const isUserExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield admin_model_1.Admin.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Phone Number/Password is incorrect");
    }
    const { id, role } = isUserExist;
    const accessToken = (0, jwtHelpeer_1.createToken)({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpeer_1.createToken)({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.logInUser = logInUser;
