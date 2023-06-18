"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderZodSchema = void 0;
const zod_1 = require("zod");
exports.OrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: "Cow field is required ",
        }),
        buyer: zod_1.z.string({
            required_error: "Buyer field is required ",
        }),
    }),
});
