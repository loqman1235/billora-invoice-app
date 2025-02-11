import nodemailer from "nodemailer";

// TODO: use nodemailer and mailtrap instead of Resend
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationCode = async (email: string, code: string) => {
  try {
    await transport.sendMail({
      from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification Code",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #ffffff;">
          <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
          <p style="color: #555; text-align: center;">Use the code below to verify your email address. This code will expire in 15 minutes.</p>
          <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 15px; background-color: #f4f4f4; border-radius: 6px; margin: 20px 0; color: #007BFF;">
            ${code}
          </div>
          <p style="color: #555; text-align: center;">If you didn’t request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="text-align: center; font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
        </div>
        `,
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw new Error("Failed to send verification code");
  }
};

export const sendVerificationToken = async (email: string, token: string) => {
  try {
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    await transport.sendMail({
      from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #f9f9f9; text-align: center;">
    <h2 style="color: #222; margin-bottom: 16px;">Verify Your Email</h2>
    <p style="font-size: 16px; color: #444; margin-bottom: 24px;">
      Click the button below to verify your email address and complete your registration.
    </p>
    <a target="_blank" href="${verifyLink}" 
       style="display: inline-block; background-color: #007bff; color: #ffffff; 
              text-decoration: none; padding: 12px 24px; border-radius: 6px; 
              font-size: 16px; font-weight: bold;">
      Verify Email
    </a>
    <p style="font-size: 14px; color: #777; margin-top: 24px;">
      This verification link will expire in <strong>30 minutes</strong>.  
      If you didn't request this, you can safely ignore this email.
    </p>
    <p style="font-size: 13px; color: #999; margin-top: 10px;">
      Need help? <a href="mailto:support@yourapp.com" style="color: #007bff; text-decoration: none;">Contact support</a>
    </p>
  </div>
`,
    });
  } catch (error) {
    console.error("Error sending verification token:", error);
    throw new Error("Failed to send verification token");
  }
};
