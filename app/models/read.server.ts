import { Read } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export const getReadNumber = async (
  userId: Read["userId"],
  feedId: Read["feedId"]
) => {
  return await prisma.read.count({ where: { userId, feedId } });
};

export const isRead = async (
  userId: Read["userId"],
  postId: Read["postId"]
) => {
  return await prisma.read.findFirst({ where: { userId, postId } });
};

export const markAsRead = async (
  userId: Read["userId"],
  postId: Read["postId"],
  feedId: Read["feedId"]
) => {
  const readInfo = await prisma.read.findMany({
    where: { userId, postId },
  });
  if (readInfo.length) return;

  return await prisma.read.create({ data: { userId, postId, feedId } });
};

export const markAsUnRead = async (
  userId: Read["userId"],
  postId: Read["postId"]
) => {
  return await prisma.read.deleteMany({ where: { userId, postId } });
};
