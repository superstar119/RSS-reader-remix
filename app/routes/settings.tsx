import { Feed } from "@prisma/client";
import {
  LoaderFunctionArgs,
  redirect,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Category, Heading, Text } from "~/components/ui/text";
import {
  createFeed,
  deleteFeed,
  getFeedById,
  getFeedByUrl,
} from "~/models/feed.server";
import { getUser } from "~/models/session.server";
import { Icon } from "~/components/ui/icon";
import { AccountItem } from "~/components/layout/account-item";
import { Button } from "~/components/ui/button";
import { ShortcutTab } from "~/components/layout/shortcut-tab";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FeedList } from "~/components/layout/feed-list";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import Parser from "rss-parser";
import { parse } from "node-html-parser";
import { createPost } from "~/models/post.server";
import {
  createFeedSubscription,
  deleteFeedSubscription,
  getUserFeedSubscription,
} from "~/models/feed-subscription.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  const feedSubscriptions = await getUserFeedSubscription(user.id);
  const feedPromise = feedSubscriptions.map((subscription) =>
    getFeedById(subscription.feedId)
  );
  const feed = await Promise.all(feedPromise);
  return feed;
};

export const fetchRSSFeed = async (url: string) => {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["content:encoded", "contentEncoded"],
          ["description", "description"],
          ["dc:creator", "author", { keepArray: true }],
        ],
      },
    });
    const feed = await parser.parseURL(url);

    const posts = feed.items.map((item) => {
      return {
        title: item.title || "",
        pubDate: item.pubDate || item.isoDate || Date.now.toString(),
        content: item.contentEncoded || item.content || item.description || "",
        author: item.creator || item.author || "",
        link: item.link || "",
        imgSrc: extractImageSrc(item),
      };
    });

    const title = feed.title || url;
    return { title, posts };
  } catch (err) {
    console.error("Error fetching RSS Feed: ", err);
    return { title: "", posts: [] };
  }
};

function extractImageSrc(item: any): string {
  if (item.enclosure && item.enclosure.type?.startsWith("image/")) {
    return item.enclosure.url;
  }

  const content = item.contentEncoded || item.content || item.description || "";

  const html = parse(content);
  const imgElement = html.querySelector("img");
  const match = imgElement?.getAttribute("src");

  return match ? match : "";
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SubmitAction;
  switch (action._action) {
    case "addFeed": {
      {
        let feed = await getFeedByUrl(action.url);

        if (!feed) {
          const rss = await fetchRSSFeed(action.url);
          feed = await createFeed(action.url, rss.title);
          const id = feed.id;
          const postsPromise = rss.posts.map((post) =>
            createPost(
              id,
              post.title,
              post.imgSrc,
              post.pubDate,
              post.content,
              post.link,
              post.author
            )
          );
          await Promise.all(postsPromise);
        }
        await createFeedSubscription(user.id, feed.id);
        return feed;
      }
    }
    case "deleteFeed": {
      const feed = await getFeedById(action.id);
      if (feed) {
        return await deleteFeedSubscription(
          feed.id,
          user.id,
          Number(action.order)
        );
      }
      return false;
    }
    // case "patchMoveFeedForwards": {
    //   return await moveFeedForwards(
    //     user.id,
    //     action.id,
    //     Number(action.source),
    //     Number(action.position)
    //   );
    // }
    // case "patchMoveFeedBackwards": {
    //   return await moveFeedBackwards(
    //     user.id,
    //     action.id,
    //     Number(action.source),
    //     Number(action.position)
    //   );
    // }
  }
};

type SubmitAction =
  | {
      _action: "addFeed";
      url: string;
    }
  | {
      _action: "deleteFeed";
      id: string;
      order: string;
    }
  | {
      _action: "updateFeed";
      id: string;
      orderId: number;
    }
  | {
      _action: "patchMoveFeedForwards";
      id: string;
      source: number;
      position: number;
    }
  | {
      _action: "patchMoveFeedBackwards";
      id: string;
      source: number;
      position: number;
    };

const Settings: FC = () => {
  const loaderData = useLoaderData<Feed[]>();

  const changeFeedOrder = useFetcher();
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feed[]>(loaderData);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.index === result.destination.index) return;

    // const actionType =
    //   result.source.index > result.destination.index
    //     ? "patchMoveFeedForwards"
    //     : "patchMoveFeedBackwards";

    // const action: SubmitAction = {
    //   _action: actionType,
    //   id: feeds[result.source.index].id,
    //   source: feeds[result.source.index].orderId,
    //   position: feeds[result.destination.index].orderId,
    // };

    // await changeFeedOrder.submit(action, { method: "patch" });

    const newFeeds = Array.from(feeds);
    const [removed] = newFeeds.splice(result.source.index, 1);
    newFeeds.splice(result.destination.index, 0, removed);

    setFeeds(newFeeds);
  };

  useEffect(() => {
    setFeeds(loaderData);
  }, [loaderData]);

  return (
    <div className="w-[560px] mx-auto flex flex-col justify-start items-center py-[180px] gap-[40px] animate-fade-in">
      <Heading className="w-full">Settings</Heading>
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="p-0 flex-col w-full flex h-auto">
          <div className="w-full flex items-center gap-[32px]">
            <TabsTrigger
              value="feed"
              className="p-0 shadow-none data-[state=active]:shadow-none text-[#c0c0c0] data-[state=active]:text-[#272727]"
            >
              <Category>Feed</Category>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="p-0 shadow-none data-[state=active]:shadow-none text-[#c0c0c0] data-[state=active]:text-[#272727] "
            >
              <Category>Account</Category>
            </TabsTrigger>
            <TabsTrigger
              value="shortcut"
              className="p-0 shadow-none data-[state=active]:shadow-none text-[#c0c0c0] data-[state=active]:text-[#272727]"
            >
              <Category>Shortcuts</Category>
            </TabsTrigger>
          </div>
          <Separator className="bg-[#c0c0c0] my-[40px]" />
        </TabsList>
        <TabsContent value="feed" className="m-0 animate-fade-in">
          <div className="flex flex-col w-full items-stretch justify-start">
            <div className="w-full flex flex-col items-stretch gap-[8px]">
              <Text>Feeds</Text>
              <div className="w-full px-[16px] py-[20px] flex flex-col rounded-[3px] border-[#f1f1f1] border gap-[12px]">
                <DragDropContext onDragEnd={onDragEnd}>
                  <FeedList items={feeds} />
                </DragDropContext>
                <form onClick={() => setEdit(true)} method="post">
                  {edit ? (
                    <div className="flex justify-between hover:opacity-70 p-0 gap-[20px]">
                      <Input
                        name="url"
                        autoFocus
                        required
                        placeholder="https://minimal.gallery/feed/"
                        className="rounded-[3px] px-[22px] py-[6px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0] h-[38px] animate-fade-in"
                      />
                      <Button
                        className="hover:bg-transparent bg-transparent h-content p-0"
                        value="addFeed"
                        name="_action"
                        type="submit"
                      >
                        <Icon iconName="add" color="#272727" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex justify-between hover:opacity-70 p-0 pl-[22px] cursor-pointer h-[26px]"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                    >
                      <Text className="animate-fade-in">Add new</Text>
                      {hover && <Icon iconName="add" color="#272727" />}
                    </div>
                  )}
                </form>
              </div>
            </div>
            <Separator className="bg-[#c0c0c0] my-[40px]" />
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between items-center">
                  <Text>Custom code</Text>
                  <Link to="/extensions">
                    <Text className="underline text-[#c0c0c0] hover:text-[#272727]">
                      View extensions
                    </Text>
                  </Link>
                </div>
                <Textarea
                  className="rounded-[3px] border-[#f1f1f1] bg-white w-full placeholder:text-[#c0c0c0] focus-visible:ring-0 focus-visible:ring-offset-0 h-[240px] resize-none px-[20px] py-[16px]"
                  placeholder="Custom CSS Style"
                />
              </div>
              <div>
                <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="account" className="m-0 animate-fade-in">
          <div className="flex flex-col justify-start items-stretch gap-[40px]">
            <div className="flex flex-col gap-[16px]">
              <AccountItem>Change payment details</AccountItem>
              <AccountItem>Pause, upgrade, downgrade or cancel</AccountItem>
              <AccountItem>Billing history & invoices</AccountItem>
            </div>
            <div>
              <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
                Open billing
                <Icon iconName="link" color="white" />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shortcut" className="m-0 animate-fade-in">
          <ShortcutTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;