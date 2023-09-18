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
exports.imageUploader = void 0;
const cloudinary_1 = require("cloudinary");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const imageUploader = (image, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!image.mimetype.startsWith("image/")) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Image type error");
    }
    if (image.size > 2 * 1024 * 1024) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Use lower size img");
    }
    try {
        const result = yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(image.tempFilePath, {
                public_id: image.name.split(".")[0] + "_" + Math.floor(new Date().getTime()),
                folder: `ecommerce/${folderName}`,
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
        return result === null || result === void 0 ? void 0 : result.url;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Image error");
    }
});
exports.imageUploader = imageUploader;
