import { getCurrentUser } from '@/action/getCurrentUser';
import { RentalFormData } from '@/components/modals/Rent/lib';
import { ListingSchema } from '@/data/listing/validation/listing.schema.zod';
import { prismaClient } from '@/lib/prisma';
import { Request } from 'express-jwt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const data = ListingSchema.parse(await request.json());

    const listing = await prismaClient.listing.create({
      data: { ...data, userId: currentUser.id },
    });

    return NextResponse.json(listing);
  } catch (e) {
    return NextResponse.error();
  }
}
