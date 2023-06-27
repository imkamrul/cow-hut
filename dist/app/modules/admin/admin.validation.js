"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogInZodSchema = exports.CreateAdminZodSchema = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
exports.CreateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...admin_constant_1.adminRole], {
            required_error: "Role is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
    }),
});
exports.CreateLogInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
    }),
});
