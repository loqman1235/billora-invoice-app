import nodemailer from "nodemailer";

const emailContent = {
  en: {
    subject: "Verify Your Email",
    heading: "Verify Your Email",
    message:
      "Click the button below to verify your email address and complete your registration.",
    button: "Verify Email",
    expiration:
      "This verification link will expire in <strong>30 minutes</strong>. If you didn't request this, you can safely ignore this email.",
    support: `Need help? <a href="mailto:support@yourapp.com" style="color: #0A0A0A; text-decoration: none;">Contact support</a>`,
  },
  fr: {
    subject: "Vérifiez votre adresse e-mail",
    heading: "Vérifiez votre adresse e-mail",
    message:
      "Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail et finaliser votre inscription.",
    button: "Vérifier l'e-mail",
    expiration:
      "Ce lien de vérification expirera dans <strong>30 minutes</strong>. Si vous n'avez pas demandé ceci, ignorez cet e-mail.",
    support: `Besoin d'aide ? <a href="mailto:support@yourapp.com" style="color: #0A0A0A; text-decoration: none;">Contactez le support</a>`,
  },
  ar: {
    subject: "تحقق من بريدك الإلكتروني",
    heading: "تحقق من بريدك الإلكتروني",
    message: "انقر على الزر أدناه للتحقق من بريدك الإلكتروني وإكمال تسجيلك.",
    button: "تحقق من البريد الإلكتروني",
    expiration:
      "ستنتهي صلاحية رابط التحقق هذا خلال <strong>30 دقيقة</strong>. إذا لم تطلب هذا، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
    support: `هل تحتاج إلى مساعدة؟ <a href="mailto:support@yourapp.com" style="color: #0A0A0A; text-decoration: none;">اتصل بالدعم</a>`,
  },
};

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

export const sendVerificationToken = async (
  email: string,
  token: string,
  locale?: string,
) => {
  try {
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    const content =
      emailContent[locale as keyof typeof emailContent] || emailContent.en;

    await transport.sendMail({
      from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
      to: email,
      subject: content.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #f9f9f9; text-align: center;">
          <h2 style="color: #222; margin-bottom: 16px;">${content.heading}</h2>
          <p style="font-size: 16px; color: #444; margin-bottom: 24px;">${content.message}</p>
          <a target="_blank" href="${verifyLink}" 
             style="display: inline-block; background-color: #0A0A0A; color: #ffffff; 
                    text-decoration: none; padding: 12px 24px; border-radius: 6px; 
                    font-size: 16px; font-weight: bold;">
            ${content.button}
          </a>
          <p style="font-size: 14px; color: #777; margin-top: 24px;">${content.expiration}</p>
          <p style="font-size: 13px; color: #999; margin-top: 10px;">${content.support}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending verification token:", error);
    throw new Error("Failed to send verification token");
  }
};
