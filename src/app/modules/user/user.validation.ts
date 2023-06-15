import { z } from "zod";
import { role } from "../../common/constant";
export const CreateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    budget: z.number({
      required_error: "Budget is required",
    }),
    income: z.number({
      required_error: "Income is required",
    }),
  }),
});
