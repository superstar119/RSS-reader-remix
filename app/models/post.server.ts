import { Feed, FeedPost, FeedSubscription, User } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";
import { getReadNumber } from "./read.server";

export async function createPost(
  feedId: Feed["id"],
  title: string,
  imgSrc: string,
  pubDate: string,
  content: string,
  link: string,
  author: string
) {
  return prisma.feedPost.create({
    data: {
      feedId: feedId,
      title: title,
      imgSrc: imgSrc,
      pubDate: pubDate,
      link: link,
      content: content,
      author: author,
    },
  });
}

export async function getPosts(
  feedId: Array<Feed["id"]>,
  skip: number,
  take: number
) {
  return prisma.feedPost.findMany({
    where: {
      feedId: {
        in: feedId,
      },
    },
    skip: skip,
    take: take,
  });
}

export const getPostsNumberByFeedIds = async (feedId: Array<Feed["id"]>) => {
  return await prisma.feedPost.count({
    where: {
      feedId: {
        in: feedId,
      },
    },
  });
};

export const getUnreadPostsNumber = async (
  userId: string,
  subscriptions: Array<FeedSubscription>
) => {
  const feedId = subscriptions.map((subscription) => subscription.feedId);
  const total = await getPostsNumberByFeedIds(feedId);
  const read = await getReadNumber(userId);

  return total - read;
};

export const getPost = async (id: FeedPost["id"]) => {
  return prisma.feedPost.findUnique({ where: { id } });
};

export const getNextRecord = async (id: FeedPost["id"]) => {
  return prisma.feedPost.findFirst({
    where: {
      id: {
        gt: id,
      },
    },
    orderBy: {
      id: "asc",
    },
  });
};
export const getPrevRecord = async (id: FeedPost["id"]) => {
  return prisma.feedPost.findFirst({
    where: {
      id: {
        lt: id,
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};
