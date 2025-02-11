import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Billora",
  description: "Invoice management made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen bg-neutral-50`}>
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
