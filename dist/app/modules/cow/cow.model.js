"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constant_1.cowLocation,
    },
    breed: {
        type: String,
        required: true,
        enum: cow_constant_1.cowBreed,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: false,
        enum: cow_constant_1.cowLabel,
    },
    category: {
        type: String,
        required: true,
        enum: cow_constant_1.cowCategory,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
cowSchema.pre("save", function (next) {
    this.label = cow_constant_1.cowLabel[0];
    next();
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
