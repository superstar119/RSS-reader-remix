import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher, Link, useNavigate } from "@remix-run/react";
import { useEffect, useState, useContext, useRef } from "react";
import { FeedPost } from "@prisma/client";

import { getUserFeedSubscription } from "~/models/feed-subscription.server";
import {
  getPostAll,
  getPosts,
  getUnreadPostsNumber,
} from "~/models/post.server";
import { getFeedById } from "~/models/feed.server";

import ago from "s-ago";

import layoutContext from "~/lib/context";
import { cn } from "~/lib/utils";

import { Theme, useTheme } from "remix-themes";
import { InfiniteScroller } from "~/components/layout/infinite-scroll";
import { getUser } from "~/models/session.server";
import { Sidebar } from "~/components/layout/side-bar";
import { Text } from "~/components/ui/text";

import preview from "../assets/preview-placeholder.png";
import { compareByDate } from "~/utils/utils";
import { markAsRead } from "~/models/read.server";
import { FeedListSubmitAction } from "~/utils/type";
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "~/assets/style.css";
import { Icon } from "~/components/ui/icon";

export const meta: MetaFunction = () => [{ title: "Feeds | RSS Feed" }];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/");

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "0");
  const skip = page * 10;
  const take = 10;

  const subscriptions = await getUserFeedSubscription(user.id);
  const posts = await getPosts(
    subscriptions.map((item) => item.feedId),
    skip,
    take
  );

  posts.sort(compareByDate);

  const sidebarDataPromises = subscriptions.map(async (item) => {
    const feed = await getFeedById(item.feedId);
    const unread = await getUnreadPostsNumber(user.id, item);
    return feed ? { item: feed.title, unread, feedId: item.feedId } : null;
  });

  const sidebarDataResults = await Promise.all(sidebarDataPromises);

  const totalUnread = sidebarDataResults.reduce(
    (sum, current) => sum + (current?.unread || 0),
    0
  );

  const sidebarData = [
    { item: "All", unread: totalUnread, feedId: 0 },
    ...sidebarDataResults.filter(Boolean),
  ];

  return json({
    sidebarData,
    data: posts,
    page,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as FeedListSubmitAction;
  switch (action._action) {
    case "filterPost": {
      {
        return null;
      }
    }
    case "markAsAllRead": {
      if (user) {
        const posts = await getPostAll();
        await Promise.all(
          posts.map((item) => markAsRead(user.id, item.id, item.feedId))
        );
      }
      return null;
    }
  }
};

const FeedList = () => {
  const initial = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const { layout, setLayout, context, setContext } = useContext(layoutContext);
  const [posts, setPosts] = useState<FeedPost[]>(initial.data);
  const [theme, setTheme] = useTheme();
  const ref = useRef([]);

  // keyboard shortcut
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case "l":
        setLayout(
          layout === "tileList"
            ? "imageList"
            : layout === "imageList"
            ? "textList"
            : "tileList"
        );
        break;
      case "s":
        navigate("/settings");
        break;
      case "e":
        fetcher.submit(
          { userId: context.userId, _action: "markAsAllRead" },
          { method: "post", action: "/feeds/list" }
        );
        break;
      case "t":
        setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // infinite data fetching
  const fetcher = useFetcher<typeof loader>();

  const loadNext = () => {
    const page = fetcher.data
      ? Number(fetcher.data.page) + 1
      : Number(initial.page + 1);
    const query = `?page=${page}`;
    fetcher.load(query);
  };

  useEffect(() => {
    if (fetcher.state === "loading") return;
    const newItems = fetcher.data?.data;
    if (newItems) {
      setPosts((prevPosts) => [...prevPosts, ...newItems]);
    }
    setContext({ ...context, unread: initial.sidebarData.at(0)["unread"] });
  }, [fetcher.data?.data, fetcher.state, initial.sidebarData]);

  return (
    <div className="relative w-full h-full">
      <Sidebar items={initial.sidebarData} />
      <InfiniteScroller
        loadNext={loadNext}
        loading={fetcher.state === "loading"}
      >
        <div
          className={cn(
            "w-[590px] mx-auto mt-[180px] animate-fade-in",
            layout === "imageList"
              ? "grid grid-cols-2"
              : "flex flex-col gap-[10px]"
          )}
        >
          {posts.map((item: any, index) => {
            return (
              <Link
                to={`/feeds/${item.id}`}
                key={index}
                className="hover:bg-gray-100 rounded-[8px] dark:hover:bg-gray-800"
              >
                <div
                  className={cn(
                    "flex px-[15px] gap-[15px] items-center",
                    layout === "textList"
                      ? "py-[12px]"
                      : layout === "imageList"
                      ? "py-[15px] flex-col"
                      : "py-[15px]"
                  )}
                >
                  <div
                    className={cn(
                      " bg-cover bg-center rounded-[3px] relative",
                      layout === "textList"
                        ? "hidden"
                        : layout === "imageList"
                        ? "w-full aspect-square"
                        : "w-[60px] min-w-[60px] min-h-[60px] h-[60px]"
                    )}
                    style={{
                      backgroundImage: `url(${
                        (item.imgSrc && item.imgSrcType === "img") ||
                        item.imgSrcType === "youtube"
                          ? item.imgSrc
                          : preview
                      })`,
                    }}
                  >
                    {item.imgSrcType === "youtube" && (
                      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <Icon
                          iconName="youtube"
                          className={
                            layout === "imageList" ? "scale-110" : "scale-[40%]"
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid gap-[5px]">
                    <Text className="truncate w-full overflow-hidden">
                      {item.title}
                    </Text>
                    <Text className="truncate text-[14px] text-[#c0c0c0] dark:opacity-50">
                      {item.feed.title + " / " + ago(new Date(item.pubDate))}
                    </Text>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full flex justify-center items-center py-[50px] mb-[180px]">
          {fetcher.state === "loading" && (
            <span className="loader text-[#272727] dark:text-[#c0c0c0]"></span>
          )}
        </div>
      </InfiniteScroller>
    </div>
  );
};

export default FeedList;
