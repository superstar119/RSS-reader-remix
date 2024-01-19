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
import { Category, Heading, Text } from "~/components/ui/text";
import { getFeeds } from "~/models/feed.server";
import { getUser } from "~/models/session.server";
import { List, arrayMove } from "react-movable";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  const feeds = await getFeeds(user.id);
  return feeds;
};

type FeedProps = {
  url: string;
};

const FeedItem: FC<FeedProps> = ({ url }) => <div>{url}</div>;

const Settings: FC = () => {
  const loaderData = useLoaderData<Feed[]>();
  const [feeds, setFeeds] = useState(loaderData.map((item) => item.url));

  return (
    <div className="w-[560px] mx-auto flex flex-col justify-start items-center mt-[180px] gap-[40px]">
      <Heading className="w-full">Settings</Heading>
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="p-0 gap-[32px] w-full justify-start">
          <TabsTrigger
            value="feed"
            className="p-0 shadow-none data-[state=active]:shadow-none"
          >
            <Category>Feed</Category>
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="p-0 shadow-none data-[state=active]:shadow-none"
          >
            <Category>Account</Category>
          </TabsTrigger>
          <TabsTrigger
            value="shortcut"
            className="p-0 shadow-none data-[state=active]:shadow-none"
          >
            <Category>Shortcuts</Category>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="m-0">
          <div className="flex flex-col w-full items-stretch justify-start">
            <Separator className="my-[40px] w-full" />
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
        <TabsContent value="account">Change your password here.</TabsContent>
        <TabsContent value="shortcut">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
