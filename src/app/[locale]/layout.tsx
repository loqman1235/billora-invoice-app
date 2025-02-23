import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Changa } from "next/font/google";

import "../globals.css";
import { ReactQueryProvider } from "../ReactQueryProvider";
// next-intl imports
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/request";
import { cn } from "@/lib/utils";

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
// });

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const changa = Changa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Billora",
  description: "Invoice management made easy",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${cn(
          locale === "ar" ? changa.className : inter.className,
        )} min-h-screen bg-neutral-50 antialiased`}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <main>{children}</main>
          </NextIntlClientProvider>
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
