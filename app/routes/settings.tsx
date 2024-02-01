import { Feed } from "@prisma/client";
import {
  LoaderFunctionArgs,
  redirect,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { FC, useEffect, useState, useRef } from "react";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Category, Heading, Text } from "~/components/ui/text";
import { createFeed, getFeedById, getFeedByUrl } from "~/models/feed.server";
import DraggableList from "react-draggable-list";
import { getUser } from "~/models/session.server";
import { Icon } from "~/components/ui/icon";
import { AccountItem } from "~/components/layout/account-item";
import { Button } from "~/components/ui/button";
import { ShortcutTab } from "~/components/layout/shortcut-tab";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import { createPost } from "~/models/post.server";
import {
  createFeedSubscription,
  deleteFeedSubscription,
  getUserFeedSubscription,
} from "~/models/feed-subscription.server";
import { Theme, useTheme } from "remix-themes";
import { cn } from "~/lib/utils";
import { fetchRSSFeed } from "~/utils/utils";
import { FeedItem } from "~/components/layout/feed-item";
import type { SettingSubmitAction } from "~/utils/type";
import { ToastContainer, toast } from "react-toastify";

declare global {
  interface Window {
    createLemonSqueezy: any;
  }
}

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SettingSubmitAction;
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
              rss.title
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
        await deleteFeedSubscription(feed.id, user.id);
        return true;
      }
      return false;
    }
  }
};

const Settings = () => {
  const loaderData = useLoaderData<Feed[]>();
  const settingsForm = useFetcher();
  const [theme] = useTheme();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [feeds, setFeeds] = useState<Array<any>>([]);

  useEffect(() => {
    setFeeds(
      loaderData.map((item, idx) => {
        return { idx: idx, ...item };
      })
    );
  }, [loaderData]);

  useEffect(() => {
    if (settingsForm.state === "idle") {
      setEdit(false);
    }
  }, [settingsForm]);

  useEffect(() => {
    if (!window.createLemonSqueezy) return;

    window.createLemonSqueezy();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

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
              <div
                className="w-full px-[16px] py-[20px] flex flex-col rounded-[3px] border-[#f1f1f1] border gap-[12px] dark:border-slate-800"
                ref={containerRef}
              >
                <DraggableList
                  itemKey="idx"
                  list={feeds}
                  onMoveEnd={(newList: any) => setFeeds(newList)}
                  container={() => containerRef.current}
                  template={FeedItem}
                  commonProps={{ fetcher: useFetcher() }}
                />
                <settingsForm.Form method="post" action="/settings">
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
                        className="!bg-transparent h-content p-0"
                        value="addFeed"
                        name="_action"
                        type="submit"
                      >
                        <Icon
                          iconName={
                            settingsForm.state === "idle" ? "add" : "loading"
                          }
                          color="#272727"
                          className={cn(
                            "animate-fade-in transition-all",
                            settingsForm.state !== "idle"
                              ? "opacity-100"
                              : hover
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex justify-between hover:opacity-70 p-0 pl-[22px] cursor-pointer h-[26px]"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                      onClick={() => setEdit(true)}
                    >
                      <Text className="animate-fade-in">Add new</Text>
                      <Icon
                        iconName={
                          settingsForm.state === "idle" ? "add" : "loading"
                        }
                        color="#272727"
                        className={cn(
                          "animate-fade-in transition-all",
                          settingsForm.state !== "idle"
                            ? "opacity-100"
                            : hover
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                  )}
                </settingsForm.Form>
              </div>
            </div>
            <Separator className="bg-[#c0c0c0] my-[40px] dark:bg-slate-800" />
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
          <div className="flex flex-col w-full items-stretch justify-start gap-[40px]">
            <div className="flex flex-col gap-[16px]">
              <AccountItem>Change payment details</AccountItem>
              <AccountItem>Pause, upgrade, downgrade or cancel</AccountItem>
              <AccountItem>Billing history & invoices</AccountItem>
            </div>
            <Link
              to="https://sortable.lemonsqueezy.com/checkout/buy/9317ae94-00bc-4f23-9ebb-3ad5b4b417c0?embed=1"
              target="_blank"
            >
              <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
                Open billing
                <Icon
                  iconName="linkBill"
                  color={theme === Theme.LIGHT ? "white" : "#020617"}
                />
              </Button>
            </Link>
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
