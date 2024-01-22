import { Read } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export const getReadNumber = async (userId: Read["userId"]) => {
  return await prisma.read.count({ where: { userId } });
};
