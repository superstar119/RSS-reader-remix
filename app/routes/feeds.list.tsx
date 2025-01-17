import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect,
} from "@vercel/remix";
import { useLoaderData, useFetcher, Link, useNavigate } from "@remix-run/react";
import { useEffect, useState, useContext } from "react";
import { FeedPost, FeedSubscription } from "@prisma/client";

import { getUserFeedSubscription } from "~/models/feed-subscription.server";
import {
  createPosts,
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
import { Sidebar, SidebarType } from "~/components/layout/side-bar";
import { Text } from "~/components/ui/text";

import preview from "../assets/preview-placeholder.png";
import { compareByDate, parseRSS } from "~/utils/utils";
import { isRead, markAsRead } from "~/models/read.server";
import {
  FeedListSubmitAction,
  FeedsListLoaderType,
  SidebarDataType,
} from "~/utils/type";
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
  const category = String(url.searchParams.get("category") || "all");

  const skip = page * 10;
  const take = 10;

  const feedSubscriptions = await getUserFeedSubscription(user.id);
  const feeds = feedSubscriptions.map((item: any) => ({
    id: item.feedId,
    url: item.feed.url,
    title: item.feed.title,
  }));


  // Input Post Data
  const addPostPromise = feeds.map(async (item: any) => {
    const rss = await parseRSS(item.url);
    if (rss.title === "" && !rss.posts.length) return;
    return createPosts(item.id, rss.posts);
  });

  await Promise.all(addPostPromise);

  const filteredFeeds =
    category === "all"
      ? feeds
      : feeds.filter((item: any) => item.id === category);

  const posts = await getPosts(
    filteredFeeds.map((item: any) => item.id),
    skip,
    take
  );

  const Posts = await Promise.all(
    posts.map(async (post: any) => {
      const read = await isRead(user.id, post.id);

      const isReading: boolean = read ? true : false;
      
      return {
        ...post,
        isReading,
      };
    })
  );

  const sidebarDataPromises = feedSubscriptions.map(
    async (item: any): Promise<SidebarDataType> => {
      const feed = await getFeedById(item.feedId);
      const unread = await getUnreadPostsNumber(user.id, item);
      return feed ? { item: feed.title, unread, feedId: item.feedId } : {};
    }
  );

  const sidebarDataResults = await Promise.all(sidebarDataPromises);

  const totalUnread = sidebarDataResults.reduce(
    (sum: number, current: SidebarDataType) => sum + (current?.unread || 0),
    0
  );

  const sidebarData = [
    { item: "all", unread: totalUnread, feedId: "all" },
    ...sidebarDataResults.filter(Boolean),
  ] as Array<SidebarDataType>;

  return json({
    sidebarData,
    posts: Posts,
    page,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as FeedListSubmitAction;
  switch (action._action) {
    case "markAsAllRead": {
      if (user) {
        const posts = await getPostAll();
        await Promise.all(
          posts.map((item: FeedPost) =>
            markAsRead(user.id, item.id, item.feedId)
          )
        );
      }
      return null;
    }
  }
};

const FeedList = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();
  const loaderData = useLoaderData<FeedsListLoaderType>();
  const { layout, setLayout, context, setContext } = useContext(layoutContext);
  const [posts, setPosts] = useState<Array<any>>(loaderData.posts);
  const [disabled, setDisable] = useState<boolean>(false);
  const markFetcher = useFetcher();
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
        markFetcher.submit(
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
  const fetcher = useFetcher<FeedsListLoaderType>();

  const loadNext = () => {
    if (disabled) return;
    const page = fetcher.data
      ? Number(fetcher.data.page) + 1
      : Number(loaderData.page + 1);
    const query = `?page=${page}&&category=${context.category}`;
    fetcher.load(query);
  };

  useEffect(() => {
    if (fetcher.state === "loading") return;
    const newItems = fetcher.data?.posts;
    const page = fetcher.data?.page;
    if (newItems && newItems.length < 10) setDisable(true);
    if (page && page > 0)
      setPosts((prevPosts: FeedPost) => {
        if (prevPosts) return prevPosts.concat(newItems);
        return newItems;
      });
    else setPosts(newItems ?? []);

    setContext({ ...context, unread: loaderData.sidebarData[0]["unread"] });
  }, [fetcher.data?.posts, fetcher.state, loaderData.sidebarData]);

  useEffect(() => {
    setDisable(false);
    fetcher.load(`/feeds/list?category=${context.category}&page=0`);
  }, [context.category]);

  return (
    <div className="relative w-full h-full">
      <Sidebar items={(loaderData.sidebarData ?? []) as Array<SidebarType>} />
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
          {posts &&
            posts.map((item: any, index) => {
              return (
                <Link
                  to={`/feeds/${item.id}`}
                  key={index}
                  className={cn(
                    "hover:bg-gray-100 rounded-[8px] dark:hover:bg-gray-800",
                    item.isReading ? "!opacity-50" : "!opacity-100"
                  )}
                >
                  <div
                    className={cn(
                      "flex px-[15px]  items-center gap-[15px]",
                      layout === "textList"
                        ? "py-[12px]"
                        : layout === "imageList"
                        ? "py-[15px] flex-col items-start"
                        : "py-[15px] "
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
                              layout === "imageList"
                                ? "scale-110"
                                : "scale-[40%]"
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
