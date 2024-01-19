import { db as prisma } from "~/utils/db.server";
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

export async function verifyUser(email: User["email"], password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) return null;

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) return false;

  const { password: _password, ...userInfo } = userWithPassword;

  return userInfo;
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}
