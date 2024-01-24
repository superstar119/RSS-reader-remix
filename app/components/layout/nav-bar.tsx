import { HTMLAttributes, FC, useState, useEffect, useContext } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../ui/icon";
import { Link, useFetcher, useLocation, useNavigate } from "@remix-run/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Theme, useTheme } from "remix-themes";
import { Category } from "../ui/text";
import layoutContext from "~/lib/context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type NavbarData = {
  postId: string;
  userId: string;
  link: string;
  unread: number;
};

type NavbarProps = HTMLAttributes<HTMLDivElement>;

const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  const location = useLocation();
  const { context } = useContext(layoutContext);
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();
  const [state, setState] = useState<String>("");
  const fetcher = useFetcher();
  const { layout, setLayout } = useContext(layoutContext);

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [layout]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (state === "feed-list") {
      if (e.key === "l" || e.key === "L") {
        switchLayout(layout);
      }
      if (e.key === "s" || e.key === "S") {
        navigate("/settings");
      }
      if (e.key === "e" || e.key === "E") {
        navigate("/feeds/list");
      }
    }
    if (state === "feed-details") {
      if (e.key === "Enter") {
        window.open(context.link, "_blank");
      }
      if (e.key === "c" || e.key === "C") {
        copyToClipboard(context.link);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      return;
    }
  };

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
                  <fetcher.Form className="!bg-transparent p-0" method="post">
                    <Input
                      type="hidden"
                      name="postId"
                      defaultValue={context.postId}
                    />
                    <Button
                      className="!bg-transparent p-0"
                      type="submit"
                      value="markAsRead"
                      name="_action"
                      asChild
                    >
                      <Icon iconName="checkmark" color="#c0c0c0" />
                    </Button>
                  </fetcher.Form>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
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
                  <Link to="/feeds/list">
                    <Icon iconName="checkmark" color="#c0c0c0" />
                    <sub></sub>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Refresh feeds</Category>
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
                    <Icon iconName="linkOut" color="#c0c0c0" />
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
                  <Button
                    className="!bg-transparent p-0"
                    onClick={() => copyToClipboard(context.link)}
                    asChild
                  >
                    <Icon iconName="linkCopy" color="#c0c0c0" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="flex gap-[9px] items-center text-[14px] rounded-[2px]"
                  sideOffset={15}
                >
                  <Category className="text-[14px]">Copy link</Category>
                  <span className="min-w-[20px] min-h-[20px] rounded-[4px] border-white border-opacity-30 bg-[#7b7b7b] border bg-opacity-10 border flex justify-center items-center items-center">
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
                  <Button className="!bg-transparent p-0" asChild>
                    <Icon
                      iconName={theme === Theme.LIGHT ? "dark" : "light"}
                      color="#c0c0c0"
                      onClick={() =>
                        setTheme(
                          theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                        )
                      }
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
};

export default Navbar;
