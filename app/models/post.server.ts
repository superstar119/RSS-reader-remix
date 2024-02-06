import { Feed, FeedPost, FeedSubscription, User } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";
import { getReadNumber } from "./read.server";
import { Post } from "~/utils/type";

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
    },
  });
}

export async function createPosts(feedId: Feed["id"], posts: Array<Post>) {
  return prisma.feedPost.createMany({
    data: posts.map((post) => {
      return { ...post, feedId };
    }),
    skipDuplicates: true,
  });
}

export async function deletePost(id: Feed["id"]) {
  await prisma.feedPost.deleteMany({
    where: { id },
  });
  return true;
}

export async function getPosts(
  feedId: Array<Feed["id"]>,
  skip: number,
  take: number
) {
  return prisma.feedPost.findMany({
    orderBy: [
      {
        pubDate: "desc",
      },
    ],
    where: {
      feedId: {
        in: feedId,
      },
    },
    include: {
      feed: {
        select: {
          title: true,
        },
      },
    },
    skip: skip,
    take: take,
  });
}

export async function getPostAll() {
  return await prisma.feedPost.findMany({});
}

export async function getPostCount() {
  return prisma.feedPost.count({});
}

export const getPostsNumberByFeedIds = async (feedId: Feed["id"]) => {
  return await prisma.feedPost.count({
    where: { feedId },
  });
};

export const getUnreadPostsNumber = async (
  userId: string,
  subscription: FeedSubscription
) => {
  const total = await getPostsNumberByFeedIds(subscription.feedId);
  const read = await getReadNumber(userId, subscription.feedId);

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
