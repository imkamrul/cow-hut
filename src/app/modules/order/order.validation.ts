import { z } from "zod";

export const OrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: "Cow field is required ",
    }),
    buyer: z.string({
      required_error: "Buyer field is required ",
    }),
  }),
});
