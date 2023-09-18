import { z } from "zod";

export const ProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required ",
    }),
    price: z.number({
      required_error: "Price field is required ",
    }),

    img_url: z.string({
      required_error: "Image field is required ",
    }),
    quantity: z.number({
      required_error: "Quantity field is required ",
    }),
    isNew: z.boolean({
      required_error: "isNew field is required ",
    }),
    discount: z.number({
      required_error: "Discount field is required ",
    }),

    seller: z.string({
      required_error: "Seller field is required ",
    }),
  }),
});
