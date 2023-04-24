import { type User } from '@prisma/client';
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  password: z.string(),
} satisfies MakeRecordValueTypeUnknown<DbUserSchema & { password: string }>);

type ClientUser = z.infer<typeof UserSchema>;
type DbUserSchema = OmitServerGenData<User, UserServerFields>;

//check type sync between database schema type to validation schema infer type
{
  const clientSchema = {} as ClientUser;
  const sameSchema: DbUserSchema = clientSchema;
}
export { type ClientUser, UserSchema };
