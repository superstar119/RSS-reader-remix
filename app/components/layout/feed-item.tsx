import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "~/lib/utils";
import { Feed } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type FeedItemProps = {
  feed: Feed;
  index: number;
};

export const FeedItem: FC<FeedItemProps> = ({ feed, index }) => {
  const [hover, setHover] = useState<boolean>(false);
  const deleteFetcher = useFetcher();
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
            <deleteFetcher.Form method="delete">
              <Input type="hidden" name="id" defaultValue={feed.id} />
              <Button
                className="!bg-transparent h-content p-0"
                value="deleteFeed"
                name="_action"
                type="submit"
                asChild
              >
                <Icon
                  iconName="trash"
                  color="#c0c0c0"
                  className={cn(
                    "animate-fade-in transition-all",
                    hover ? "opacity-100" : "opacity-0"
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
