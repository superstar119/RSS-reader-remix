import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher, Link, useNavigate } from "@remix-run/react";
import { useEffect, useState, useContext } from "react";
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

    return feed ? { item: feed.title, unread } : null;
  });

  const sidebarDataResults = await Promise.all(sidebarDataPromises);

  const totalUnread = sidebarDataResults.reduce(
    (sum, current) => sum + (current?.unread || 0),
    0
  );

  const sidebarData = [
    { item: "All", unread: totalUnread },
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

  const _action = await formData.get("_action");

  if (_action === "markAsAllRead" && user) {
    const posts = await getPostAll();
    await Promise.all(
      posts.map((item) => markAsRead(user.id, item.id, item.feedId))
    );
  }
  return null;
};

const FeedList = () => {
  const initial = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const { layout, setLayout, context, setContext } = useContext(layoutContext);
  const [posts, setPosts] = useState<FeedPost[]>(initial.data);
  const [theme, setTheme] = useTheme();

  const fetcher = useFetcher<typeof loader>();

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

  useEffect(() => {
    if (fetcher.state === "loading") return;
    // if (fetcher.state === "idle" && fetcher.data === true) return;
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
        loadNext={() => {
          const page = fetcher.data
            ? Number(fetcher.data.page) + 1
            : Number(initial.page) + 1;
          const query = `?page=${page}`;
          console.log(initial.page);
          fetcher.load(query);
        }}
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
                      " bg-cover bg-center rounded-[3px]",
                      layout === "textList"
                        ? "hidden"
                        : layout === "imageList"
                        ? "w-full aspect-square"
                        : "w-[60px] min-w-[60px] min-h-[60px] h-[60px]"
                    )}
                    style={{
                      backgroundImage: `url(${
                        item.imgSrc ? item.imgSrc : preview
                      })`,
                    }}
                  />
                  <div className="grid gap-[5px]">
                    <Text className="truncate w-full overflow-hidden">
                      {item.title}
                    </Text>
                    <Text className="truncate text-[14px] text-[#c0c0c0] dark:opacity-50">
                      {item.author + " / " + ago(new Date(item.pubDate))}
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
