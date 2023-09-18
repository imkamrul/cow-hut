"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
exports.ProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name field is required ",
        }),
        price: zod_1.z.number({
            required_error: "Price field is required ",
        }),
        img_url: zod_1.z.string({
            required_error: "Image field is required ",
        }),
        quantity: zod_1.z.number({
            required_error: "Quantity field is required ",
        }),
        isNew: zod_1.z.boolean({
            required_error: "isNew field is required ",
        }),
        discount: zod_1.z.number({
            required_error: "Discount field is required ",
        }),
        seller: zod_1.z.string({
            required_error: "Seller field is required ",
        }),
    }),
});
