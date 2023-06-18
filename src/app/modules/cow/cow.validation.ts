import { z } from "zod";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";
export const CowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required ",
    }),
    age: z.number({
      required_error: "Age field is required ",
    }),
    price: z.number({
      required_error: "Price field is required ",
    }),

    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: "Location field is needed",
    }),

    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: "Breed field is needed",
    }),
    weight: z.number({
      required_error: "Weight field is required ",
    }),
    label: z
      .enum([...cowLabel] as [string, ...string[]], {
        required_error: "Label field is needed",
      })
      .optional(),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: "Category field is needed",
    }),
    seller: z.string({
      required_error: "Seller field is required ",
    }),
  }),
});
export const UpdatedCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name field is required ",
      })
      .optional(),
    age: z
      .number({
        required_error: "Age field is required ",
      })
      .optional(),
    price: z
      .number({
        required_error: "Price field is required ",
      })
      .optional(),

    location: z
      .enum([...cowLocation] as [string, ...string[]], {
        required_error: "Location field is needed",
      })
      .optional(),

    breed: z
      .enum([...cowBreed] as [string, ...string[]], {
        required_error: "Breed field is needed",
      })
      .optional(),
    weight: z
      .number({
        required_error: "Weight field is required ",
      })
      .optional(),
    label: z
      .enum([...cowLabel] as [string, ...string[]], {
        required_error: "Label field is needed",
      })
      .optional(),
    category: z
      .enum([...cowCategory] as [string, ...string[]], {
        required_error: "Category field is needed",
      })
      .optional(),
    seller: z
      .string({
        required_error: "Seller field is required ",
      })
      .optional(),
  }),
});
