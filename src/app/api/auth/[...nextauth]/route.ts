import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GihubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import bcrypt from "bcrypt";

const option: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GihubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    Credentials({
      name: "platform-auth",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!(credentials?.email && credentials.password)) {
          throw new Error("Invalid credential");
        }

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Invalid credential");

        const matchCorrectPassword = bcrypt.compareSync(
          credentials.password,
          (user as unknown as { hashedPassword: string }).hashedPassword
        );

        if (!matchCorrectPassword) throw new Error("Invalid credential");

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(option);

export { handler as GET, handler as POST, option as nextAuthOptions };
