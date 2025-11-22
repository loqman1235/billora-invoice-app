import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized() {
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
