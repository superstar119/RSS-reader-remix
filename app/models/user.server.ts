import { db as prisma } from "~/utils/db.server";
// @ts-ignore
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
export type { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
}
