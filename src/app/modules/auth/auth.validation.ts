import { z } from "zod";
import { role } from "./auth.constant";

export const CreateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]], {
      required_error: "Role is required",
    }),

    name: z.string({
      required_error: "Name is required",
    }),

    email: z.string({
      required_error: "Email is required",
    }),
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const CreateLogInZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),

    emailPhone: z.string({
      required_error: "Email/Phone number is required",
    }),
  }),
});
export const CreatePasswordZodSchema = z.object({
  body: z.object({
    old_password: z.string({
      required_error: "Old Password is required",
    }),
    password: z.string({
      required_error: "New Password is required",
    }),

    confirm_password: z.string({
      required_error: "Confirm password is required",
    }),
  }),
});
