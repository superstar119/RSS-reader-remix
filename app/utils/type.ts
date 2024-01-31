import { FeedPost } from "@prisma/client";

export type SettingSubmitAction =
  | {
      _action: "addFeed";
      url: string;
    }
  | {
      _action: "deleteFeed";
      id: string;
    }
  | {
      _action: "updateFeed";
      id: string;
      orderId: number;
    };

export type FeedLoaderType = {
  post: FeedPost;
  userId: string;
  nextId?: string;
  prevId?: string;
};
