import { v4 as uuid } from "uuid";
import {
  createVerificationCode,
  createVerificationToken,
  deleteVerificationCode,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "./db";

// import VerificationCode type from prisma

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(Date.now() + 30 * 60 * 1000); // expires after 30 minutes

  // check if token already exists
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }

  const verificationToken = await createVerificationToken(
    email,
    token,
    new Date(expires),
  );

  return verificationToken;
};

export const generateVerificationCode = async (email: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 30 * 1000); // expires after 30 seconds

  await deleteVerificationCode(email);

  const verificationCode = await createVerificationCode(email, code, expires);

  return verificationCode;
};
