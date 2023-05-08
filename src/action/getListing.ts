import { prismaClient } from '../lib/prisma';
export function getListing() {
  const listing = prismaClient.listing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return listing;
}
