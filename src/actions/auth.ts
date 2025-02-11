"use server";

import { signIn, signOut } from "@/auth";
import { getUserByEmail, getVerificationTokenByToken } from "@/lib/db";
import { sendVerificationCode, sendVerificationToken } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { SignInSchema, signInSchema } from "@/lib/schemas/sign-in";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/sign-up";
import {
  generateVerificationCode,
  generateVerificationToken,
} from "@/lib/token";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const signUpAction = async (prevState: unknown, data: SignUpSchema) => {
  const parsedData = signUpSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsedData.data;

  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: create a verification code
    const verificationToken = await generateVerificationToken(email);

    // TODO:  send verification code to email
    await sendVerificationToken(email, verificationToken.token);

    return {
      success: true,
      data: user,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const signInAction = async (
  previousState: unknown,
  data: SignInSchema,
) => {
  const parsedFields = signInSchema.safeParse(data);

  if (!parsedFields.success) {
    return {
      fieldErrors: parsedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            globalError: "Invalid credentials",
          };
        case "CallbackRouteError":
          return {
            globalError: "Invalid credentials",
          };
        default:
          return {
            globalError: "Invalid credentials",
          };
      }
    }

    throw error;
  }
};

export const googleSignInAction = async () => {
  await signIn("google", {
    redirectTo: DEFAULT_REDIRECT,
  });
};

export const verifyEmailAction = async (email: string, code: string) => {
  try {
    if (!email || !code) {
      return {
        success: false,
        error: "Missing email or code",
      };
    }

    const verificationCode = await prisma.verificationCode.findUnique({
      where: { email_code: { email, code } },
    });

    if (!verificationCode) {
      return {
        success: false,
        error: "Invalid code",
      };
    }

    //  Check if code has expired
    if (verificationCode.expires < new Date()) {
      return {
        success: false,
        error: "Code has expired",
      };
    }

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const resendVerificationCodeAction = async (email: string) => {
  if (!email) {
    return {
      success: false,
      error: "Email is required",
    };
  }

  try {
    const verificationCode = await generateVerificationCode(email);

    if (!verificationCode) {
      return {
        success: false,
        error: "Failed to generate verification code",
      };
    }

    await sendVerificationCode(email, verificationCode.code);

    return {
      success: true,
      message: "Verification code sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const verifyEmailTokenAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      success: false,
      error: "Invalid token",
    };
  }

  const hasExpired = existingToken.expires < new Date();

  if (hasExpired) {
    return {
      success: false,
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      success: false,
      error: "User not found",
    };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: true,
    message:
      "Email verified successfully. You will be redirected in 3 seconds.",
  };
};

export const resendVerificationTokenAction = async (email: string) => {
  try {
    const verificationToken = await generateVerificationToken(email);

    if (!verificationToken) {
      return {
        success: false,
        error: "Failed to generate verification token",
      };
    }

    await sendVerificationToken(email, verificationToken.token);

    return {
      success: true,
      message: "Verification token sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const signOutAction = async () => {
  await signOut();
};
