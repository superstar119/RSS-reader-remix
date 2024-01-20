import { Feed, User } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export async function getFeeds(userId: User["id"]) {
  return await prisma.feed.findMany({ where: { userId } });
}

export async function createFeed(userId: User["id"], url: Feed["url"]) {
  return prisma.feed.create({
    data: {
      url: url,
      userId: userId,
    },
  });
}
