"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedCowZodSchema = exports.CowZodSchema = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
exports.CowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name field is required ",
        }),
        age: zod_1.z.number({
            required_error: "Age field is required ",
        }),
        price: zod_1.z.number({
            required_error: "Price field is required ",
        }),
        location: zod_1.z.enum([...cow_constant_1.cowLocation], {
            required_error: "Location field is needed",
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed], {
            required_error: "Breed field is needed",
        }),
        weight: zod_1.z.number({
            required_error: "Weight field is required ",
        }),
        label: zod_1.z
            .enum([...cow_constant_1.cowLabel], {
            required_error: "Label field is needed",
        })
            .optional(),
        category: zod_1.z.enum([...cow_constant_1.cowCategory], {
            required_error: "Category field is needed",
        }),
        seller: zod_1.z.string({
            required_error: "Seller field is required ",
        }),
    }),
});
exports.UpdatedCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name field is required ",
        })
            .optional(),
        age: zod_1.z
            .number({
            required_error: "Age field is required ",
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Price field is required ",
        })
            .optional(),
        location: zod_1.z
            .enum([...cow_constant_1.cowLocation], {
            required_error: "Location field is needed",
        })
            .optional(),
        breed: zod_1.z
            .enum([...cow_constant_1.cowBreed], {
            required_error: "Breed field is needed",
        })
            .optional(),
        weight: zod_1.z
            .number({
            required_error: "Weight field is required ",
        })
            .optional(),
        label: zod_1.z
            .enum([...cow_constant_1.cowLabel], {
            required_error: "Label field is needed",
        })
            .optional(),
        category: zod_1.z
            .enum([...cow_constant_1.cowCategory], {
            required_error: "Category field is needed",
        })
            .optional(),
        seller: zod_1.z
            .string({
            required_error: "Seller field is required ",
        })
            .optional(),
    }),
});
