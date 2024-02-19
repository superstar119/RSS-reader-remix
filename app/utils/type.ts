import { FeedPost } from "@prisma/client";
import { ReactNode } from "react";
import { HTMLElement as ParsedElement } from "node-html-parser";

export type FeedItemType = {
  id: string;
  userId: string;
  order: number;
  feed: {
    url: string;
  };
};

export type SettingLoaderType = {
  feeds: FeedItemType[];
};

export type SettingActionType =
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

export type SettingFeedItemType = {
  id: string;
  feedId: string;
  userId: string;
  order: number;
  feed: {
    url: string;
  };
};

export type StatusType = "subscribed" | "trial";

export type FeedLoaderType = {
  post: FeedPost & {
    feed: any;
  };
  userId: string;
  nextId?: string;
  prevId?: string;
};

export type FeedsListLoaderType = {
  sidebarData: Array<SidebarDataType>;
  data: Array<FeedPost>;
  page: number;
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
  category: string;
};

export type PostType = {
  title: string;
  imgSrc: string;
  imgSrcType: string;
  pubDate: string;
  content: string;
  link: string;
};

export type SidebarDataType = {
  item?: string;
  unread?: number;
  feedId?: string;
};

export type MediaType = { type: string; value: ParsedElement };

export const PREVIEW_MIN_WIDTH = 200;
export const YOUTUBE_HOSTNAME = "www.youtube.com";
export const TRIAL_DATE = "free";
