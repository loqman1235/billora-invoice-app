import { z } from "zod";

export const createSignInSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: t("messages.errors.form.email.required") }),
    password: z
      .string()
      .trim()
      .min(1, {
        message: t("messages.errors.form.password.required"),
      }),
  });
};

export type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;
