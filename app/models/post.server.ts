import { Feed, FeedPost, FeedSubscription } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";
import { getReadNumber } from "./read.server";
import { PostType } from "~/utils/type";

export async function createPost(
  feedId: Feed["id"],
  title: string,
  imgSrc: string,
  imgSrcType: string,
  pubDate: string,
  content: string,
  link: string
) {
  return prisma.feedPost.create({
    data: {
      feedId: feedId,
      title: title,
      imgSrc: imgSrc,
      imgSrcType: imgSrcType,
      pubDate: pubDate,
      link: link,
      content: content,
    },
  });
}

export async function createPosts(feedId: Feed["id"], posts: Array<PostType>) {
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
    where: {
      feedId: {
        in: feedId,
      },
    },
    orderBy: [
      {
        pubDate: "desc",
      },
    ],
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
  return prisma.feedPost.findUnique({
    where: { id },
    include: {
      feed: {
        select: {
          title: true,
        },
      },
    },
  });
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
