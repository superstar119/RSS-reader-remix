import { FeedPost } from "@prisma/client";
import { ReactNode } from "react";

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

export type FeedListSubmitAction =
  | {
      _action: "filterPost";
      id: string | number;
    }
  | {
      _action: "markAsAllRead";
      id: string | number;
    };

export interface DocumentProps {
  children: ReactNode;
  title?: string;
}

export interface LayoutProps {
  children: ReactNode;
}

export type ContextType = {
  postId: string;
  userId: string;
  link: string;
  unread: number;
};
