import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verify } from "argon2";
import prisma from "../../../lib/prisma";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const dbUser = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        const validPassword = await verify(
          dbUser.password,
          credentials?.password
        );
        if (!validPassword) {
          throw new Error("Invalid password");
        }
        // Any object returned will be saved in `user` property of the JWT

        return { id: dbUser.id, name: dbUser.username };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user && (token = { ...token, user });
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
