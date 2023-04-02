import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../../src/lib/prisma';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'string' },
        password: { label: 'password', type: 'string' },
      },

      async authorize(credentials) {
        if (!(credentials?.email && credentials.password)) return null;

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const matchCorrectPassword = bcrypt.compareSync(
          credentials.password,
          (user as unknown as { hashedPassword: string }).hashedPassword
        );

        if (!matchCorrectPassword) return null;

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
