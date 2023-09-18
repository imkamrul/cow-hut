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
exports.findAllProduct = exports.multipleProductDelete = exports.saveDummyProducts = exports.updateProduct = exports.deleteProduct = exports.getSingleProduct = exports.saveProduct = void 0;
const http_status_1 = __importDefault(require("http-status"));
const FakeDataGenerate_1 = require("../../common/FakeDataGenerate");
const pagination_1 = require("../../common/pagination");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const ImageUploader_1 = require("../../middleware/ImageUploader");
const auth_constant_1 = require("../auth/auth.constant");
const product_constat_1 = require("./product.constat");
const product_model_1 = require("./product.model");
const saveProduct = (product, image) => __awaiter(void 0, void 0, void 0, function* () {
    if (image) {
        const img_url = yield (0, ImageUploader_1.imageUploader)(image, "product");
        product.img_url = img_url;
    }
    const result = yield product_model_1.Product.create(product);
    return result;
});
exports.saveProduct = saveProduct;
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id }).populate("seller", "name email phoneNumber");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found !");
    }
    return result;
});
exports.getSingleProduct = getSingleProduct;
const deleteProduct = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if ((user === null || user === void 0 ? void 0 : user.role) === auth_constant_1.role[1]) {
        result = yield product_model_1.Product.findByIdAndDelete({ _id: id });
    }
    else {
        const productFind = yield product_model_1.Product.findOne({ _id: id, seller: user === null || user === void 0 ? void 0 : user.id });
        if (productFind) {
            result = yield product_model_1.Product.findByIdAndDelete({ _id: id });
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found!");
        }
    }
    return result;
});
exports.deleteProduct = deleteProduct;
const updateProduct = (id, user, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (image) {
        const img_url = yield (0, ImageUploader_1.imageUploader)(image, "product");
        payload.img_url = img_url;
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === auth_constant_1.role[1]) {
        result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        });
    }
    else {
        const productFind = yield product_model_1.Product.findOne({ _id: id, seller: user === null || user === void 0 ? void 0 : user.id });
        if (productFind) {
            result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            });
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found!");
        }
    }
    return result;
});
exports.updateProduct = updateProduct;
const saveDummyProducts = (dataNumber, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = Array.from({ length: Number(dataNumber) }, () => (0, FakeDataGenerate_1.generateProductData)(sellerId));
    try {
        const result = (yield product_model_1.Product.create(products));
        return result;
    }
    catch (error) {
        throw new Error(`Error saving dummy products: ${error.message}`);
    }
});
exports.saveDummyProducts = saveDummyProducts;
const multipleProductDelete = (deleteProductIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteMany({ _id: { $in: deleteProductIds } });
    return result.deletedCount || 0;
});
exports.multipleProductDelete = multipleProductDelete;
const findAllProduct = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: product_constat_1.productSearchableFields.map((field) => ({
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
    const result = yield product_model_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.findAllProduct = findAllProduct;
