import { Request } from 'express';
import { getCurrentUser } from '@/action/getCurrentUser';
import { RentalFormData } from '@/components/modals/Rent/lib';
import { ListingSchema } from '@/data/listing/validation/listing.schema.zod';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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

export async function GET(req: Request) {
  try {
    const query = req.query;
    const listings = prismaClient.listing.findMany();
    return NextResponse.json(listings);
  } catch (e) {}
}
