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
exports.multipleUserDelete = exports.findAllUser = exports.deleteUser = exports.updateProfileInfo = exports.updateUserPassword = exports.getSingleUser = exports.updateUser = exports.UserLogIn = exports.saveUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpeer_1 = require("../../common/jwtHelpeer");
const pagination_1 = require("../../common/pagination");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const ImageUploader_1 = require("../../middleware/ImageUploader");
const auth_constant_1 = require("./auth.constant");
const auth_model_1 = require("./auth.model");
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_pass;
    }
    const createdUser = yield auth_model_1.User.create(user);
    // Fetch the user again without the 'password' field
    const result = yield auth_model_1.User.findById(createdUser._id).select("-password");
    return result;
});
exports.saveUser = saveUser;
const UserLogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailPhone, password } = payload;
    const isUserExist = yield auth_model_1.User.findByEmailOrPhoneAndPassword(emailPhone, password);
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status) === auth_constant_1.status[2]) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Your account has been blocked, Talk to admin !");
    }
    if (isUserExist && (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id) && (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role)) {
        const { id, role } = isUserExist;
        const token = (0, jwtHelpeer_1.createToken)({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const updateUserToken = yield (0, exports.updateUser)(isUserExist.id, { token });
        return {
            token,
        };
    }
    else {
        return null;
    }
});
exports.UserLogIn = UserLogIn;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.updateUser = updateUser;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findOne({ _id: id }).select("-password, -token");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.getSingleUser = getSingleUser;
const updateUserPassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password &&
        payload.old_password &&
        payload.password === payload.confirm_password &&
        id) {
        const findUser = yield auth_model_1.User.findOne({ _id: id });
        const compareOldPassNewPass = yield auth_model_1.User.isPasswordMatched(payload.password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
        if (compareOldPassNewPass) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Old password & new password must not be same!");
        }
        else {
            const result = yield auth_model_1.User.isPasswordMatched(payload.old_password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
            if (result) {
                let password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
                const updateUserPassword = yield (0, exports.updateUser)(id, {
                    password,
                });
                return updateUserPassword;
            }
            else {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Old password is not match !");
            }
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password & confirm password is not match !");
    }
});
exports.updateUserPassword = updateUserPassword;
const updateProfileInfo = (id, user, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const searchOption = {
        _id: { $ne: id },
    };
    if ((payload === null || payload === void 0 ? void 0 : payload.phoneNumber) || (payload === null || payload === void 0 ? void 0 : payload.email)) {
        searchOption.$or = [];
        if (payload === null || payload === void 0 ? void 0 : payload.phoneNumber) {
            searchOption.$or.push({ phoneNumber: payload.phoneNumber });
        }
        if (payload === null || payload === void 0 ? void 0 : payload.email) {
            searchOption.$or.push({ email: payload.email });
        }
    }
    const findUser = yield auth_model_1.User.findOne(searchOption);
    if (findUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Your email or phone number already exist !");
    }
    if (image) {
        const img_url = yield (0, ImageUploader_1.imageUploader)(image, "user");
        payload.img_url = img_url;
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === auth_constant_1.role[1]) {
        if (payload.password) {
            payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
        }
        const updateProfile = yield (0, exports.updateUser)(id, payload);
        result = yield auth_model_1.User.findOne({ _id: updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.id }, { password: 0, token: 0 });
    }
    else {
        if (payload.password) {
            delete payload.password;
        }
        if (payload === null || payload === void 0 ? void 0 : payload.role) {
            delete payload.role;
        }
        if (payload === null || payload === void 0 ? void 0 : payload.status) {
            delete payload.status;
        }
        const updateProfile = yield (0, exports.updateUser)(id, payload);
        result = yield auth_model_1.User.findOne({ _id: updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.id }, { password: 0, token: 0 });
    }
    return result;
});
exports.updateProfileInfo = updateProfileInfo;
const deleteUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if ((user === null || user === void 0 ? void 0 : user.role) === auth_constant_1.role[1] || id === (user === null || user === void 0 ? void 0 : user.id)) {
        result = yield auth_model_1.User.findByIdAndDelete({ _id: id });
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.deleteUser = deleteUser;
const findAllUser = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: auth_constant_1.userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield auth_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield auth_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.findAllUser = findAllUser;
const multipleUserDelete = (deleteProductIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.deleteMany({ _id: { $in: deleteProductIds } });
    return result.deletedCount || 0;
});
exports.multipleUserDelete = multipleUserDelete;
