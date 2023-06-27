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
exports.getSingleOrderById = exports.getAllOrder = exports.saveOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const cow_constant_1 = require("../cow/cow.constant");
const cow_model_1 = require("../cow/cow.model");
const cow_service_1 = require("../cow/cow.service");
const user_constant_1 = require("../user/user.constant");
const user_model_1 = require("../user/user.model");
const user_service_1 = require("../user/user.service");
const order_model_1 = require("./order.model");
const saveOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cow, buyer } = data;
    const findCow = yield (0, cow_service_1.getSingleCow)(cow);
    if ((findCow === null || findCow === void 0 ? void 0 : findCow.label) === cow_constant_1.cowLabel[1]) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This cow is already sold");
    }
    const findBuyer = yield (0, user_service_1.getSingleUser)(buyer);
    let newOder;
    if (findCow && findBuyer && findBuyer.budget >= findCow.price) {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const options = { new: true, session: session };
            yield user_model_1.User.findOneAndUpdate({ _id: buyer }, { $inc: { budget: -findCow.price } }, options);
            yield cow_model_1.Cow.findOneAndUpdate({ _id: cow }, {
                label: cow_constant_1.cowLabel[1],
            }, options);
            yield user_model_1.User.findOneAndUpdate({ _id: (_a = findCow === null || findCow === void 0 ? void 0 : findCow.seller) === null || _a === void 0 ? void 0 : _a._id }, { $inc: { income: findCow.price } }, options);
            newOder = yield order_model_1.Order.create([data], { session });
            if (!newOder) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create New Order");
            }
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
    else if (findBuyer && findBuyer.role !== "buyer") {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not a buyer");
    }
    else if (findCow && findBuyer && findBuyer.budget <= findCow.price) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user has not enough balance");
    }
    const result = yield order_model_1.Order.findById(newOder[0]._id).populate([
        { path: "cow" },
        { path: "buyer" },
        {
            path: "cow",
            populate: {
                path: "seller",
                model: "User",
            },
        },
    ]);
    return result;
});
exports.saveOrder = saveOrder;
const getAllOrder = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === user_constant_1.role[0]) {
        result = yield order_model_1.Order.find({ buyer: userInfo.id }).populate([
            { path: "cow" },
            { path: "buyer" },
            {
                path: "cow",
                populate: {
                    path: "seller",
                    model: "User",
                    select: "-password",
                },
            },
        ]);
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === user_constant_1.role[1]) {
        result = yield order_model_1.Order.find().populate([
            { path: "cow" },
            { path: "buyer" },
            {
                path: "cow",
                populate: {
                    path: "seller",
                    model: "User",
                    select: "-password",
                    match: { _id: userInfo.id },
                },
            },
        ]);
    }
    else {
        result = yield order_model_1.Order.find().populate([
            { path: "cow" },
            { path: "buyer" },
            {
                path: "cow",
                populate: {
                    path: "seller",
                    model: "User",
                    select: "-password",
                },
            },
        ]);
    }
    return result;
});
exports.getAllOrder = getAllOrder;
const getSingleOrderById = (userInfo, id) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = { _id: id };
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === "buyer") {
        filter = Object.assign(Object.assign({}, filter), { buyer: userInfo.id });
    }
    console.log("filter:", filter);
    let result;
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === user_constant_1.role[0]) {
        result = yield order_model_1.Order.findOne(filter).populate([
            { path: "cow" },
            { path: "buyer" },
            {
                path: "cow",
                populate: {
                    path: "seller",
                    model: "User",
                    select: "-password",
                },
            },
        ]);
    }
    else {
        result = yield order_model_1.Order.findOne(filter).populate([
            { path: "cow" },
            { path: "buyer" },
            {
                path: "cow",
                populate: {
                    path: "seller",
                    model: "User",
                    select: "-password",
                },
            },
        ]);
    }
    console.log("result:", result);
    return result;
});
exports.getSingleOrderById = getSingleOrderById;
