import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher, Link } from "@remix-run/react";
import { Text } from "~/components/ui/text";
import { getUser } from "~/models/session.server";
import preview from "../assets/preview-placeholder.png";
import { useEffect, useState, useRef, useContext } from "react";
import { FeedPost, FeedSubscription, User } from "@prisma/client";
import { getUserFeedSubscription } from "~/models/feed-subscription.server";
import {
  getPosts,
  getPostsNumberByFeedIds,
  getUnreadPostsNumber,
} from "~/models/post.server";
import { ThreeDots } from "react-loading-icons";
import ago from "s-ago";
import layoutContext from "~/lib/context";
import { cn } from "~/lib/utils";
import { Sidebar, SidebarType } from "~/components/layout/side-bar";
import { getReadNumber } from "~/models/read.server";
import { getFeedById } from "~/models/feed.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/");

  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 0;
  const skip = Number(page) * 30;
  const take = 30;

  const subscriptions = await getUserFeedSubscription(user.id);
  const posts = await getPosts(
    subscriptions.map((item) => item.feedId),
    skip,
    take
  );

  let sidebarData: Array<{
    item: string;
    unread: number;
  }> = [
    {
      item: "All",
      unread: await getUnreadPostsNumber(user.id, subscriptions),
    },
  ];

  for (const item of subscriptions) {
    const feed = await getFeedById(item.feedId);
    const unread = await getUnreadPostsNumber(user.id, [item]);

    if (feed) {
      sidebarData.push({
        item: feed.title,
        unread: unread,
      });
    }
  }

  return {
    sidebarData: sidebarData,
    data: posts,
    page: page,
  };
};

const InfiniteScroller = (props: {
  children: any;
  loading: boolean;
  loadNext: () => void;
}) => {
  const { children, loading, loadNext } = props;
  const scrollListener = useRef(loadNext);

  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  const onScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
    const scrollEnded = documentHeight == scrollDifference;

    if (scrollEnded && !loading) {
      scrollListener.current();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
};

const FeedList = () => {
  const initial = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const { layout } = useContext(layoutContext);
  const [posts, setPosts] = useState<FeedPost[]>(initial.data);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") return;

    if (fetcher.data) {
      const newItems = fetcher.data.data;
      setPosts((prevPosts) => [...prevPosts, ...newItems]);
    }
  }, [fetcher.data]);

  return (
    <div className="relative w-full h-full">
      <div className="fixed top-[230px] left-[40px]">
        <Sidebar items={initial.sidebarData} />
      </div>
      <InfiniteScroller
        loadNext={() => {
          const page = fetcher.data
            ? Number(fetcher.data.page) + 1
            : Number(initial.page) + 1;
          const query = `?page=${page}`;
          fetcher.load(query);
        }}
        loading={fetcher.data === "loading"}
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
              <Link to={`/feeds/${item.id}`} key={index}>
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
                  <div className="flex flex-col gap-[5px] w-full">
                    <Text className="truncate w-full overflow-hidden">
                      {item.title}
                    </Text>
                    <Text className="text-[14px] text-[#c0c0c0]">
                      {item.author + " / " + ago(new Date(item.pubDate))}
                    </Text>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="w-full flex justify-center items-center py-[20px] mb-[180px]">
            {fetcher.state === "loading" && (
              <ThreeDots fill="#c0c0c0" className="w-[40px] h-[20px]" />
            )}
          </div>
        </div>
      </InfiniteScroller>
    </div>
  );
};

export default FeedList;
