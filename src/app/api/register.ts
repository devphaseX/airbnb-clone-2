import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { prismaClient } from '../../lib/prisma';

export const POST = async (request: Request) => {
  const data = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!(data.name && data.email && data.password)) {
    throw new Error('Invalid sent data');
  }

  const prevUserRegister = await prismaClient.user.findUnique({
    where: { email: data.email },
  });

  if (prevUserRegister) throw new Error('A user already exist with that email');

  const user = await prismaClient.user.create({
    data: {
      name: data.name,
      email: data.password,
      hashedPassword: bcrypt.hashSync(data.password, 10),
    },
  });

  delete (user as Partial<User>).hashedPassword;

  return NextResponse.json(user);
};
