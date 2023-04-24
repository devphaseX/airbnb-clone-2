import { prismaClient } from '@/lib/prisma';
import { getSession } from './getSession';

async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prismaClient.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    //@ts-ignore
    delete currentUser.hashedPassword;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerifies: currentUser.emailVerified?.toISOString() ?? null,
    };
  } catch (e) {}
}

export { getCurrentUser };
