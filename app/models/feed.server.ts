import { User } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export async function getFeeds(userId: User["id"]) {
  return await prisma.feed.findMany({ where: { userId } });
}
