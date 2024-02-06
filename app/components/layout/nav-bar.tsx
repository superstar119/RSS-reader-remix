import { useState, useEffect, useContext } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../ui/icon";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Theme, useTheme } from "remix-themes";
import { Category, Text } from "../ui/text";
import layoutContext from "~/lib/context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { copyToClipboard } from "~/utils/utils";
import { toast } from "sonner";

export function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useTheme();
  const { layout, context, setLayout } = useContext(layoutContext);
  const fetcher = useFetcher();

  const [state, setState] = useState<string>("empty");

  useEffect(() => {
    const states: { [key: string]: string } = {
      "/login": "auth",
      "/register": "auth",
      "/feeds/list": "feed-list",
      "/settings": "setting",
      "/feeds": "empty",
      "/reset": "auth",
    };
    setState(states[location.pathname] || "feed-details");

    if (location.pathname.startsWith("/reset/")) setState("auth");
  }, [location.pathname]);

  if (state === "empty") return null;

  const switchLayout = () => {
    const layouts: { [key: string]: string } = {
      tileList: "imageList",
      imageList: "textList",
      textList: "tileList",
    };
    setLayout(layouts[layout] || "tileList");
  };

  return (
    <div
      className={cn(
        "w-full h-[96px] min-h-[96px] py-[22px] flex  items-center fixed top-0 left-0 z-40",
        state === "auth" ? "justify-center" : "justify-between px-[30px]"
      )}
    >
      <Link to="/">
        <Icon iconName="logo" color="#000" />
      </Link>
      {state === "setting" && (
        <Link to="/feeds">
          <Icon color="#c0c0c0" iconName="close" />
        </Link>
      )}

      {(state === "feed-list" || state === "feed-details") && (
        <div className="flex gap-[30px]">
          {state === "feed-details" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <fetcher.Form
                    className="!bg-transparent p-0"
                    method="delete"
                    action={`/feeds/${context.postId}`}
                  >
                    <Input
                      type="hidden"
                      name="postId"
                      defaultValue={context.postId}
                    />
                    <button
                      className="!bg-transparent p-0 block"
                      type="submit"
                      value="markAsUnRead"
                      name="_action"
                    >
                      <Icon iconName="checkmark" color="#c0c0c0" />
                    </button>
                  </fetcher.Form>
                </TooltipTrigger>
                <TooltipContent className="flex gap-[9px] items-center text-[14px] rounded-[2px]">
                  <Category className="text-[14px]">Mark as unread</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    E
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {state === "feed-list" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <fetcher.Form
                    className="!bg-transparent p-0"
                    method="post"
                    action="/feeds/list"
                  >
                    <Input
                      type="hidden"
                      name="userId"
                      defaultValue={context.userId}
                    />
                    <button
                      className="!bg-transparent p-0"
                      type="submit"
                      value="markAsAllRead"
                      name="_action"
                    >
                      <div className="relative text-[#c0c0c0] hover:text-[#272727] dark:hover:text-[#fff]">
                        <Icon iconName="checkmark" color="#c0c0c0" />
                        <Text className="text-inherit absolute left-3/4 bottom-0 text-[10px] font-bold transition-all transition-duration-500 hover:!text-[#c0c0c0]">
                          {context.unread}
                        </Text>
                      </div>
                    </button>
                  </fetcher.Form>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Mark all as read</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    E
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {state === "feed-list" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="feeds/list">
                    <Icon iconName="reload" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Refresh feeds</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    R
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {state === "feed-list" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Icon
                    iconName={
                      layout === "tileList"
                        ? "tiles"
                        : layout === "textList"
                        ? "imageList"
                        : "list"
                    }
                    color="#c0c0c0"
                    onClick={() => switchLayout()}
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Switch layout</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    L
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {state === "feed-details" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to={context.link} target="_blank">
                    <Icon iconName="link" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Open link</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    <Icon
                      iconName="return"
                      className="w-[14px] h-[20px]"
                      color="#7b7b7b"
                    />
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {state === "feed-details" && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button
                    className="!bg-transparent p-0"
                    onClick={() => {
                      copyToClipboard(context.link, toast);
                    }}
                    asChild
                  >
                    <Icon iconName="linkCopy" color="#c0c0c0" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Copy Link</Category>
                  <span
                    className={cn(
                      "min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center"
                    )}
                  >
                    C
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {(state === "feed-list" || state === "feed-details") && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button
                    className="!bg-transparent p-0"
                    onClick={() =>
                      setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
                    }
                    asChild
                  >
                    <Icon
                      iconName={theme === Theme.LIGHT ? "dark" : "light"}
                      color="#c0c0c0"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Switch theme</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    L
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {(state === "feed-list" || state === "feed-details") && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="/settings">
                    <Icon iconName="setting" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Settings</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
                    S
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
}
