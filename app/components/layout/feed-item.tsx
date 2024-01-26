import { FC, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "~/lib/utils";
import { Feed } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { deleteFeedSubscription } from "~/models/feed-subscription.server";
import { getUser } from "~/models/session.server";

type FeedItemProps = {
  feed: Feed;
  index: number;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get('_action');
  const id = formData.get('id');

  if (action === 'deleteFeed' && id) {
    const user = await getUser(request);
    if (!user) return redirect("/login");
    await deleteFeedSubscription(id.toString(), user.id);
    return json({ success: true });
  }
};

export const FeedItem: FC<FeedItemProps> = ({ feed, index }) => {
  const [hover, setHover] = useState<boolean>(false);
  const deleteFetcher = useFetcher();

  const handleDeleteClick = (id: string) => {
    deleteFetcher.submit({ id: id, _action: 'deleteFeed' }, { method: 'post' });
  };

  return (
    <Draggable draggableId={feed.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col"
          aria-label="Change feed order"
        >
          <div
            className={cn(
              "flex items-center justify-between",
              snapshot.isDragging
                ? "shadow rounded-[3px] border border-[#f1f1f1] "
                : ""
            )}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            <div className=" gap-[12px] flex items-center">
              <Icon
                iconName="drag"
                color="#c0c0c0"
                className={cn(
                  "animate-fade-in transition-all",
                  hover ? "opacity-100" : "opacity-0"
                )}
              />

              <Text>{feed.url}</Text>
            </div>
            <deleteFetcher.Form method="post">
              <Input type="hidden" name="id" defaultValue={feed.id} />
              <Button
                className="!bg-transparent h-content p-0"
                value="deleteFeed"
                name="_action"
                type="submit"
                onClick={() => handleDeleteClick(feed.id)}
                asChild
              >
                <Icon
                  iconName={deleteFetcher.state === 'idle' ? "trash" : "loading"}
                  color="#c0c0c0"
                  className={cn(
                    "animate-fade-in transition-all",
                    deleteFetcher.state !== 'idle' ? "opacity-100" : hover ? "opacity-100" : "opacity-0" 
                  )}
                />
              </Button>
            </deleteFetcher.Form>
          </div>
          <Separator className="h-[1px] bg-[#f1f1f1] mt-[12px] pl-[22px] dark:bg-slate-800" />
        </div>
      )}
    </Draggable>
  );
};
