import { redirect, LoaderFunctionArgs, ActionFunction } from "@vercel/remix";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@vercel/remix";
import { useEffect, useState, useRef } from "react";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Category, Heading, Text } from "~/components/ui/text";
import {
  createFeed,
  getFeedById,
  getFeedByUrl,
  updateFeed,
} from "~/models/feed.server";
import { getUser } from "~/models/session.server";
import { Icon } from "~/components/ui/icon";
import { AccountItem } from "~/components/layout/account-item";
import { Button } from "~/components/ui/button";
import { ShortcutTab } from "~/components/layout/shortcut-tab";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "@hello-pangea/dnd";

import { createPosts } from "~/models/post.server";
import { Theme, useTheme } from "remix-themes";
import {
  createFeedSubscription,
  deleteFeedSubscription,
  getUserFeeds,
} from "~/models/feed-subscription.server";
import { cn } from "~/lib/utils";
import { isTrialExpired, parseRSS, reorder } from "~/utils/utils";
import type {
  SettingActionType,
  SettingFeedItemType,
  StatusType,
} from "~/utils/type";
import { FeedItem } from "~/components/layout/feed-item";
import { toast } from "sonner";
import dayjs from "dayjs";

declare global {
  interface Window {
    createLemonSqueezy: any;
  }
}

interface LemonsqueezyCustomersResponse {
  data: Array<{
    [key: string]: any;
  }>;
}

export const Meta = () => [
  {
    title: "RSS Feed | Settings",
  },
];

export const config = { runtime: "nodejs" };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Validate User Session
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const fetchURL =
    "https://api.lemonsqueezy.com/v1/subscriptions?email=" +
    encodeURIComponent(user.email);

  const apiKey =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhZWRjOTQxZDgyMGVmNjNkMjRjOGE2YTliNzZlOWEyZWUyNGRhOWQyMzg2NDc2NTgzYzRjYTg2NzBmY2ZlYWMzMDUwNDYzMzVhNWMxMDY0ZCIsImlhdCI6MTcwNzQwMDUxMS42NzA5OSwibmJmIjoxNzA3NDAwNTExLjY3MDk5MywiZXhwIjoyMDIzMDE5NzExLjY1NDA0Miwic3ViIjoiMTg5MjQzMSIsInNjb3BlcyI6W119.Ucoe6jQ-tkO7EqWjElLOVNXttcqcA2hufZqAe38JzkggCqn7ft2SBVcOCKd42eVLnYa5dkKMN8TNGZ_LCiRp9cDulN1eINiQfJE1wVlra0Hgz7eSGL10ha3w623ScRp1yLQsMEdhapQfa7CyXKFFRxm9Ws_0GrJMkH7WhaCbJE2c2P7BdbAXtA4-Kmfc5j3Yxhy24otO1xK-mwA9pC-CJSuBj3S4V7EXrVCkklXtdFdQnYujwEahRWjXzmF1VqQZlB_fQRzlB-LBVdB2Uv50IM5Eftj2d-pmDZouKrO2uLKlWkBIMp9bOG0Pu7g0Xy86ShHtZcTwDTzV_oP38nnDKMj_SAfoLTCwOKFENwDgMPW2GpFRNZ_hUfShPngnChKhgvDtmXoq8SLJ3Km6ngH0ZvOSPtc2FJ1RGUdKyfdb_OjY_kObi9GPM1RhXFMF_DyYWTjO6MlGtSN58pcl-HnadN9kdpZ0gKtPNzl3uPcGMlQzCVO8TD0a-M_MvZJqNAV6";
  const storeID = "171169";

  const lemonsqueezyResponse = await fetch(fetchURL, {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!lemonsqueezyResponse.ok) {
    throw new Error("Failed to fetch subscriptions from Lemonsqueezy.");
  }

  const subscriptions =
    (await lemonsqueezyResponse.json()) as LemonsqueezyCustomersResponse;

  if (!subscriptions) {
    throw new Error("Failed to parse subscriptions from Lemonsqueezy.");
  }

  const subscription = subscriptions.data.filter(
    (item) =>
      item.attributes.store_id == storeID &&
      item.attributes.user_email == user.email &&
      dayjs().isBefore(dayjs(item.attributes.renews_at))
  );

  let startedAt = null;
  const plan: StatusType = subscription.length ? "subscribed" : "trial";

  if (plan === "trial" && !isTrialExpired(user)) startedAt = user.createdAt;
  if (plan === "trial" && isTrialExpired(user)) return redirect("/checkout");

  const feed = await getUserFeeds(user.id);

  return json({ feeds: feed, plan, startedAt });
};

export const action: ActionFunction = async ({ request }) => {
  // Validate User session
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SettingActionType;

  switch (action._action) {
    case "addFeed": {
      let feed = await getFeedByUrl(action.url);
      if (!feed || feed.updatedAt.toString() !== Date.now().toString()) {
        const rss = await parseRSS(action.url);
        if (rss.title === "" && !rss.posts.length)
          return json({
            errors: "Something went wrong. Try again.",
          });
        if (!feed) feed = await createFeed(action.url, rss.title);
        feed = await updateFeed(action.url, rss.title);
        await createPosts(feed.id, rss.posts);
      }
      await createFeedSubscription(user.id, feed.id);
      return json({ errors: "none" });
    }
    case "deleteFeed": {
      const feed = await getFeedById(action.id);
      if (feed) await deleteFeedSubscription(feed.id, user.id);
      return json({ errors: "none" });
    }
  }
};

const Settings = () => {
  const loaderData = useLoaderData<typeof loader>();
  const settingsForm = useFetcher();
  const [theme] = useTheme();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [feeds, setFeeds] = useState<Array<SettingFeedItemType>>([]);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.source.index === result.destination.index) {
      return;
    }

    const items = reorder(feeds, result.source.index, result.destination.index);
    setFeeds(items);
  };

  useEffect(() => {
    if (loaderData.feeds) setFeeds(loaderData.feeds);
  }, [loaderData]);

  useEffect(() => {
    if (settingsForm.state === "idle") {
      setEdit(false);
      const response = settingsForm.data as {
        _action?: string;
        errors?: string;
      };
      if (response?.errors === "none") {
        toast("Feed is added succssfully.", {
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      } else if (typeof response?.errors === "string") {
        toast(response.errors, {
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      }
    }
  }, [settingsForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const diffDays = (date: string) => {
    console.log(date);
    const from: Date = new Date();
    const to: Date = new Date(date);
    const diff = (from.getTime() - to.getTime()) / (24 * 60 * 60 * 1000);

    return 7 - Math.ceil(diff);
  };

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
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="flex flex-col">
                    <Droppable droppableId="droppable">
                      {(droppableProvided: DroppableProvided) => (
                        <div
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                        >
                          {loaderData.feeds.map(
                            (item: SettingFeedItemType, idx: number) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                disableInteractiveElementBlocking={true}
                                index={idx}
                              >
                                {(draggableProvided: DraggableProvided) => (
                                  <FeedItem
                                    ref={draggableProvided.innerRef}
                                    item={item}
                                    {...draggableProvided.dragHandleProps}
                                    {...draggableProvided.draggableProps}
                                  />
                                )}
                              </Draggable>
                            )
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </DragDropContext>

                <settingsForm.Form method="post" action="/settings">
                  {edit ? (
                    <div className="flex justify-between hover:opacity-70 p-0 gap-[20px]">
                      <Input
                        name="url"
                        autoFocus
                        required
                        placeholder="https://minimal.gallery/feed/"
                        className="rounded-[3px] px-[22px] py-[6px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0] h-[38px] animate-fade-in !bg-transparent"
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
            {loaderData.plan === "subscribed" ? (
              <div className="flex flex-col gap-[16px]">
                <AccountItem>Change payment details</AccountItem>
                <AccountItem>Pause, upgrade, downgrade or cancel</AccountItem>
                <AccountItem>Billing history & invoices</AccountItem>
              </div>
            ) : (
              <div className="dark:text-white text-[#272727]">
                <Category className="flex items-center gap-[8px]">
                  You have
                  <span className="w-[40px] h-[40px] inline-flex justify-center items-center rounded-full border-2 border-[#f07743] text-[#f07743]">
                    {diffDays(loaderData.startedAt)}
                  </span>
                  days left in your free trial.
                </Category>
              </div>
            )}
            <Link
              to="https://sortable.lemonsqueezy.com/checkout/buy/87685d22-4a7a-46f1-bc70-89d78c8ce64a?embed=1"
              target="_blank"
              className="inline-block"
            >
              {loaderData.plan === "subscribed" ? (
                <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
                  Open billing
                  <Icon
                    iconName="linkBill"
                    color={theme === Theme.LIGHT ? "white" : "#020617"}
                  />
                </Button>
              ) : (
                <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
                  Select a plan
                  <Icon
                    iconName="arrowRight"
                    iconClassName="w-[20px] h-[16px]"
                    color={theme === Theme.LIGHT ? "white" : "#020617"}
                  />
                </Button>
              )}
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
