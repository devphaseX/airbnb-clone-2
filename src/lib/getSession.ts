import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { prismaClient } from '../lib/prisma';

async function getSession() {
  const session = await getServerSession(authOptions);

  if (!(session && session.user)) return null;

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) return null;

  return session;
}

interface SafeUser extends Omit<User, 'hashedPassword'> {}

export type { SafeUser };
export { getSession };