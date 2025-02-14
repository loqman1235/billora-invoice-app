import { z } from "zod";

export const createInvoiceSchema = z.object({
  billingName: z.string().trim().min(1, { message: "Name is required" }),
  billingEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
  description: z.string().trim().optional(),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;
