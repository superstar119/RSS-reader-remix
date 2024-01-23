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

// export async function updateFeedOrder(
//   id: Feed["id"],
//   orderId: Feed["orderId"]
// ) {
//   await prisma.feed.update({
//     where: { id },
//     data: { orderId: orderId },
//   });
//   return true;
// }

// export async function moveFeedForwards(
//   userId: User["id"],
//   feedId: Feed["id"],
//   source: number,
//   position: number
// ) {
//   const transactions = [
//     prisma.feed.updateMany({
//       where: { userId, orderId: { gte: position, lte: source } },
//       data: { orderId: { increment: 1 } },
//     }),
//     prisma.feed.update({ where: { id: feedId }, data: { orderId: position } }),
//   ];

//   await prisma.$transaction(transactions);
//   return true;
// }

// export async function moveFeedBackwards(
//   userId: User["id"],
//   feedId: Feed["id"],
//   source: number,
//   position: number
// ) {
//   const transactions = [
//     prisma.feed.updateMany({
//       where: { userId, orderId: { lte: position, gte: source } },
//       data: { orderId: { decrement: 1 } },
//     }),
//     prisma.feed.update({ where: { id: feedId }, data: { orderId: position } }),
//   ];

//   await prisma.$transaction(transactions);
//   return true;
// }
