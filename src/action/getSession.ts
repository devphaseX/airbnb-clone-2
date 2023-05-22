import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";

export function getSession() {
  return getServerSession(nextAuthOptions);
}

type SafeUser = Omit<User, "hashedPassword">;
export { type SafeUser };
