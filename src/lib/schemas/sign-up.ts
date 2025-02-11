import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
