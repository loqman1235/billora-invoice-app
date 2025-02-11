import { prisma } from "./prisma";
import { VerificationCode, VerificationToken } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token:", error);
    throw new Error("Failed to fetch verification token.");
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token:", error);
    throw new Error("Failed to fetch verification token.");
  }
};

export const deleteVerificationToken = async (id: string) => {
  try {
    await prisma.verificationToken.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting verification token:", error);
    throw new Error("Failed to delete verification token.");
  }
};

export const createVerificationToken = async (
  email: string,
  token: string,
  expires: Date,
): Promise<VerificationToken> => {
  try {
    return await prisma.verificationToken.create({
      data: { email, token, expires },
    });
  } catch (error) {
    console.error("Error creating verification token:", error);
    throw new Error("Failed to create verification token.");
  }
};

export const deleteVerificationCode = async (email: string) => {
  try {
    await prisma.verificationCode.deleteMany({ where: { email } });
  } catch (error) {
    console.error("Error deleting verification code:", error);
    throw new Error("Failed to delete verification code.");
  }
};

export const createVerificationCode = async (
  email: string,
  code: string,
  expires: Date,
): Promise<VerificationCode> => {
  try {
    return await prisma.verificationCode.create({
      data: { email, code, expires },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create verification code");
  }
};
