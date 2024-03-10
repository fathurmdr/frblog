import NextAuth from "next-auth";
import { authOptions } from "./auth";

const AuthService = NextAuth(authOptions);

export { AuthService as GET, AuthService as POST };
