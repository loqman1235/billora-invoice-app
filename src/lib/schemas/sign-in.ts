import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
