"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  CreateInvoiceSchema,
  createInvoiceSchema,
} from "@/lib/schemas/create-invoice";

export const createInvoiceAction = async (
  prevState: unknown,
  data: CreateInvoiceSchema,
) => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const parsedData = createInvoiceSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { billingName, billingEmail, amount, description } = parsedData.data;

  try {
    await prisma.invoice.create({
      data: {
        billingName,
        billingEmail,
        amount,
        description,
        userId: session.user.id!,
      },
    });

    return {
      success: true,
      message: "Invoice created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
