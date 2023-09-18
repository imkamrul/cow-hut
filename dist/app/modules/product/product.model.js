"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    isNew: {
        type: Boolean,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    total_sell: {
        type: Number,
        required: false,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
productSchema.pre("save", function (next) {
    this.total_sell = 0;
    next();
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
