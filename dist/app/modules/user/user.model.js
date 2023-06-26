"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: user_constant_1.role,
    },
    password: {
        type: String,
        required: true,
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
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    this.income = 0;
    if (this.role === user_constant_1.role[1]) {
        this.budget = 0;
    }
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
