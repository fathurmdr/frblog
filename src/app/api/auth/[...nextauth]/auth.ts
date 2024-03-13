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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await prismaClient.user.findFirst({
        where: {
          email: user.email,
        },
        include: {
          accounts: true,
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
      return `/sign-in?error=try-${existingUser.accounts[0].provider}`;
    },
    async jwt({ token, user }) {
      if (user) {
        const userRoles = await prismaClient.userRole.findMany({
          where: { userId: user.id },
        });
        return {
          ...token,
          roles: userRoles.map((userRole) => userRole.type as string),
        };
      }
      return token;
    },
    async session({ session }) {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
