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
exports.Admin = void 0;
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const AdminSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: admin_constant_1.adminRole,
    },
    password: {
        required: true,
        type: String,
        select: false,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
AdminSchema.statics.isAdminExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        // const searchingOption=  id.includes("@") ? {email:id} : {phoneNumber:id}
        return yield exports.Admin.findOne({ phoneNumber: id }, { id: 1, password: 1, role: 1 });
    });
};
AdminSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
AdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
exports.Admin = (0, mongoose_1.model)("Admin", AdminSchema);
