import { UserSchema } from '@/data/validations/user.schema.zod';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

export const POST = async (request: Request) => {
  try {
    const data = await UserSchema.parse(await request.json());

    const prevUserRegister = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (prevUserRegister) {
      throw new Error('A user already exist with that email');
    }

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword: bcrypt.hashSync(data.password, 10),
      },
    });

    delete (user as Partial<User>).hashedPassword;

    return NextResponse.json(user);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(JSON.stringify(e));
    }

    throw new Error();
  }
};
