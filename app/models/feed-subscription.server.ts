import { Feed, FeedSubscription, User } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export const getUserFeedSubscription = async (id: User["id"]) => {
  return prisma.feedSubscription.findMany({
    where: { userId: id },
    orderBy: { order: "asc" },
  });
};

export const getUserFeeds = async (id: User["id"]) => {
  return prisma.feedSubscription.findMany({
    where: { userId: id },
    orderBy: { order: "asc" },
    include: {
      feed: {
        select: {
          url: true,
        },
      },
    },
  });
};

export const createFeedSubscription = async (
  userId: User["id"],
  feedId: Feed["id"]
) => {
  const subscription = await prisma.feedSubscription.findMany({
    where: { userId, feedId },
  });
  if (subscription.length) return;
  const lastIndex = await prisma.feedSubscription.findFirst({
    orderBy: { order: "desc" },
  });
  return prisma.feedSubscription.create({
    data: {
      feedId,
      userId,
      order: lastIndex ? lastIndex.order + 1 : 1,
    },
  });
};

export const deleteFeedSubscription = async (
  feedId: Feed["id"],
  userId: User["id"]
) => {
  return prisma.feedSubscription.deleteMany({
    where: { feedId, userId },
  });
};
