import { HTMLAttributes, FC, useState, useEffect, useContext } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../ui/icon";
import { Link, useFetcher, useLoaderData, useLocation } from "@remix-run/react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Category } from "../ui/text";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import layoutContext from "~/lib/context";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUser } from "~/models/session.server";

type NavbarProps = HTMLAttributes<HTMLDivElement> & {};

const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  const location = useLocation();
  const [state, setState] = useState<String>("");
  const fetcher = useFetcher();
  const { layout, setLayout } = useContext(layoutContext);
  let unreads;
  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setState("auth");
        break;
      case "/register":
        setState("auth");
        break;
      case "/feeds/list":
        setState("feed-list");
        break;
      case "/settings":
        setState("setting");
        break;
      case "/feeds":
        setState("empty");
        break;
      default:
        setState("feed-details");
        break;
    }
  }, [location]);

  if (state === "empty" || state == "") return null;

  const switchLayout = (layout: string) => {
    switch (layout) {
      case "tileList":
        setLayout("imageList");
        break;

      case "imageList":
        setLayout("textList");
        break;
      default:
        setLayout("tileList");
        break;
    }
  };

  return (
    <div
      className={cn(
        "w-full h-[96px] min-h-[96px] py-[22px] flex  items-center fixed top-0 left-0 z-40",
        state === "auth" ? "justify-center" : "justify-between px-[30px]",
        className
      )}
      {...props}
    >
      <Link to="/">
        <Icon iconName="logo" color="#C0C0C0" />
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
                  <Link to="/feeds/list">
                    <Icon iconName="checkmark" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Mark as unread
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Link to="/feeds/list">
                    <Icon iconName="checkmark" color="#c0c0c0" />
                    <sub></sub>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Refresh feeds
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Link to="/feeds/list">
                    <Icon iconName="reload" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Refresh feeds
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Icon
                    iconName={
                      layout === "tileList"
                        ? "tiles"
                        : layout === "textList"
                        ? "imageList"
                        : "list"
                    }
                    color="#c0c0c0"
                    onClick={() => switchLayout(layout)}
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Switch layout
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Link to="/settings">
                    <Icon iconName="linkOut" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Open link
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
                    <Icon
                      iconName="return"
                      className="w-[14px] h-[20px]"
                      color="#fff"
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
                  <Link to="/settings">
                    <Icon iconName="linkCopy" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Copy link
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Link to="/settings">
                    <Icon iconName="dark" color="#c0c0c0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Switch theme
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
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
                  className="flex gap-[9px] items-center text-[14px] shadow-none border-0 bg-[#272727] rounded-[2px]"
                  sideOffset={15}
                >
                  <TooltipArrow color="#272727" />
                  <Category className="text-[14px] text-white">
                    Settings
                  </Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border text-white bg-opacity-10 border flex justify-center items-center items-center">
                    L
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
