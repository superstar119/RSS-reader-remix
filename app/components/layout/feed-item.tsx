import { HTMLAttributes, useState, forwardRef } from "react";
import { useFetcher } from "@remix-run/react";

import { Separator } from "@radix-ui/react-separator";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";

import { cn } from "~/lib/utils";

import { SettingFeedItemType } from "~/utils/type";

type FeedItemProps = {
  item: SettingFeedItemType;
} & HTMLAttributes<HTMLDivElement>;

export const FeedItem = forwardRef<HTMLDivElement, FeedItemProps>(
  ({ item, ...props }, ref) => {
    const [hover, setHover] = useState<boolean>(false);
    const fetcher = useFetcher();

    return (
      <div
        className="flex flex-col"
        aria-label="Change feed order"
        ref={ref}
        {...props}
      >
        <div
          className={cn("flex items-center justify-between")}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <div className=" gap-[12px] flex items-center">
            <div className={hover ? "opacity-100" : "opacity-0"}>
              <Icon
                iconName="drag"
                color="#c0c0c0"
                className={cn("animate-fade-in transition-all")}
              />
            </div>
            <Text>{item.feed.url}</Text>
          </div>
          <fetcher.Form method="delete" action="/settings" className="z-40">
            <Input type="hidden" name="id" defaultValue={item.id} />
            <button
              className="!bg-transparent h-content p-0 inline-flex justify-center items-center"
              value="deleteFeed"
              name="_action"
              type="submit"
            >
              <Icon
                iconName={fetcher.state === "idle" ? "trash" : "loading"}
                color="#c0c0c0"
                className={cn(
                  "animate-fade-in transition-all",
                  fetcher.state !== "idle"
                    ? "opacity-100"
                    : hover
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </button>
          </fetcher.Form>
        </div>
        <Separator className="h-[1px] bg-[#f1f1f1] my-[12px] pl-[22px] dark:bg-slate-800" />
      </div>
    );
  }
);
