// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prismaClient } from '@/lib/prisma';
// import { NextAuthOptions } from 'next-auth';
// import bcrypt from 'bcrypt';

// const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prismaClient),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'string' },
//         password: { label: 'password', type: 'string' },
//       },

//       async authorize(credentials): Promise<any> {
//         if (!(credentials?.email && credentials.password)) return null;

//         const user = await prismaClient.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;
//         const matchCorrectPassword = bcrypt.compareSync(
//           credentials.password,
//           (user as unknown as { hashedPassword: string }).hashedPassword
//         );

//         if (!matchCorrectPassword) return null;

//         return user;
//       },
//     }),
//   ],
//   session: { strategy: 'jwt' },
//   debug: process.env.NODE_ENV === 'development',
//   secret: process.env.NEXTAUTH_SECRET,
//   //   pages: { signIn: '/', error: '/' },
// };

// export { authOptions };
