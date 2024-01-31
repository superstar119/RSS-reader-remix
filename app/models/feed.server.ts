import { Feed } from "@prisma/client";
import { db as prisma } from "~/utils/db.server";

export async function getFeedByUrl(url: Feed["url"]) {
  return prisma.feed.findUnique({
    where: { url },
  });
}

export async function getFeedById(id: Feed["id"]) {
  return prisma.feed.findUnique({ where: { id } });
}

export async function createFeed(
  url: Feed["url"],
  title: Feed["title"] | undefined
) {
  return prisma.feed.create({ data: { url, title: title || url } });
}

export async function deleteFeed(id: Feed["id"]) {
  await prisma.feed.delete({
    where: { id },
  });
  return true;
}
