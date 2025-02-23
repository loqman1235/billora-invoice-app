import { z } from "zod";

export const createSignUpSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t("messages.errors.form.name.required") }),
    email: z
      .string()
      .trim()
      .min(1, { message: t("messages.errors.form.email.required") })
      .email({ message: t("messages.errors.form.email.invalid") }),
    password: z
      .string()
      .trim()
      .min(1, {
        message: t("messages.errors.form.password.required"),
      }),
  });
};

export type SignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>;
