import { z } from "zod";
import { adminRole } from "./admin.constant";

export const CreateAdminZodSchema = z.object({
  body: z.object({
    role: z.enum([...adminRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
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
  }),
});
export const CreateLogInZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),

    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
  }),
});
