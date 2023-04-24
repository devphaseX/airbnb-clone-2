import { z } from 'zod';
import { type Listing } from '@prisma/client';

type DbListingSchema = OmitServerGenData<Listing, ListServerFields>;
const ListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  location: z.string(),
  category: z.string(),
  imageSrc: z.string(),
  roomCount: z.number(),
  guestCount: z.number(),
  bathroomCount: z.number(),
} satisfies MakeRecordValueTypeUnknown<DbListingSchema>);

type ClientListing = z.infer<typeof ListingSchema>;
//check type sync between database schema type to validation schema infer type
{
  const clientSchema = {} as ClientListing;
  const sameSchema: DbListingSchema = clientSchema;
}

export { type ClientListing, ListingSchema };
