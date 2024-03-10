import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await prismaClient.user.findFirst({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {
        return true;
      }

      const existingAccount = await prismaClient.account.findFirst({
        where: {
          userId: user.id,
          provider: account?.provider,
        },
      });

      if (existingAccount) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
