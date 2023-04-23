import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prismaClient } from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

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
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials): Promise<any> {
        if (!(credentials?.email && credentials.password)) {
          throw new Error('Invalid credential');
        }

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error('Invalid credential');

        const matchCorrectPassword = bcrypt.compareSync(
          credentials.password,
          (user as unknown as { hashedPassword: string }).hashedPassword
        );

        if (!matchCorrectPassword) throw new Error('Invalid credential');

        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/', error: '/' },
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST, authOptions };
