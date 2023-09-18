"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePasswordZodSchema = exports.CreateLogInZodSchema = exports.CreateUserZodSchema = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
exports.CreateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...auth_constant_1.role], {
            required_error: "Role is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.CreateLogInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        emailPhone: zod_1.z.string({
            required_error: "Email/Phone number is required",
        }),
    }),
});
exports.CreatePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        old_password: zod_1.z.string({
            required_error: "Old Password is required",
        }),
        password: zod_1.z.string({
            required_error: "New Password is required",
        }),
        confirm_password: zod_1.z.string({
            required_error: "Confirm password is required",
        }),
    }),
});
