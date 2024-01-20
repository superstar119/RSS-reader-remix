import { Feed } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FC, HTMLAttributes, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Category, Heading, Key, Text } from "~/components/ui/text";
import { getFeeds } from "~/models/feed.server";
import { getUser } from "~/models/session.server";
import { List, arrayMove } from "react-movable";
import { Icon } from "~/components/ui/icon";
import { AccountItem } from "~/components/layout/account-item";
import { Button } from "~/components/ui/button";
import { ShortcutItem } from "~/components/layout/shortcut-item";
import { Shortcut } from "~/components/ui/shortcut";
import { ShortcutTab } from "~/components/layout/shortcut-tab";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  const feeds = await getFeeds(user.id);
  return feeds;
};

const Settings: FC = () => {
  const loaderData = useLoaderData<Feed[]>();
  const [feeds, setFeeds] = useState(loaderData.map((item) => item.url));

  return (
    <div className="w-[560px] mx-auto flex flex-col justify-start items-center py-[180px] gap-[40px]">
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
              <div className="w-full px-[16px] py-[20px] flex flex-col rounded-[3px] border-[#f1f1f1] border">
                <List
                  values={feeds}
                  onChange={({ oldIndex, newIndex }) =>
                    setFeeds(arrayMove(feeds, oldIndex, newIndex))
                  }
                  renderList={({ children, props }) => (
                    <div {...props} className="w-full">
                      {children}
                    </div>
                  )}
                  renderItem={({ value, props }) => (
                    <div className="w-full flex flex-col bg-white" {...props}>
                      <div>{value}</div>
                      <Separator className="my-[12px]"></Separator>
                    </div>
                  )}
                ></List>
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
