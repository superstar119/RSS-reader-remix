import { Read } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export const getReadNumber = async (userId: Read["userId"]) => {
  return await prisma.read.count({ where: { userId } });
};

export const markAsRead = async (
  userId: Read["userId"],
  postId: Read["postId"]
) => {
  const readInfo = await prisma.read.findMany({ where: { userId, postId } });
  if (readInfo) return;

  return await prisma.read.create({ data: { userId, postId } });
};

export const markAsUnRead = async (
  userId: Read["userId"],
  postId: Read["postId"]
) => {
  return await prisma.read.deleteMany({ where: { userId, postId } });
};
