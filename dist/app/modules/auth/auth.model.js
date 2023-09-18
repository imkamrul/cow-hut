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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const auth_constant_1 = require("./auth.constant");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: auth_constant_1.role,
    },
    name: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    billing_address: {
        type: String,
        required: false,
    },
    shipping_address: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
        enum: auth_constant_1.status,
    },
    totalMoney: {
        type: Number,
        required: false,
    },
    token: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.status = auth_constant_1.status[0];
        this.role = auth_constant_1.role[0];
        this.totalMoney = 0;
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.statics.findByEmailOrPhoneAndPassword = function (emailOrPhone, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const User = this;
        const user = yield User.findOne({
            $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
        });
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Email/Phone Number/Password is incorrect");
        }
        return user;
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
