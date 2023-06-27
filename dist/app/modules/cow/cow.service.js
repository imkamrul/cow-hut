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
exports.updateCow = exports.deleteCow = exports.getSingleCow = exports.getAllCows = exports.saveCow = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../common/pagination");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_constant_1 = require("../user/user.constant");
const user_model_1 = require("../user/user.model");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const saveCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield user_model_1.User.findOne({ _id: cow.seller });
    if (!getUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    else if (getUser.role !== user_constant_1.role[1]) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not a seller !");
    }
    const result = yield cow_model_1.Cow.create(cow);
    return result;
});
exports.saveCow = saveCow;
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
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
    console.log(JSON.stringify(whereConditions, null, 2));
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.getAllCows = getAllCows;
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOne({ _id: id }).populate("seller");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    return result;
});
exports.getSingleCow = getSingleCow;
const deleteCow = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cowFind = yield cow_model_1.Cow.findOne({ _id: id });
    if (!cowFind) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    if (cowFind.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    return result;
});
exports.deleteCow = deleteCow;
const updateCow = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cowFind = yield cow_model_1.Cow.findOne({ _id: id });
    if (!cowFind) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    if (cowFind.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.updateCow = updateCow;
