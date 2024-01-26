import { HTMLAttributes, FC, useState, useEffect, useContext } from "react";
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
import { getUser } from "~/models/session.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { markAsRead, markAsUnRead } from "~/models/read.server";
import { getPostAll } from "~/models/post.server";

export type NavbarData = {
  postId: string;
  userId: string;
  link: string;
  unread: number;
};

type NavbarProps = HTMLAttributes<HTMLDivElement>;

export const switchLayout = (layout: string) => {
  const { setLayout } = useContext(layoutContext);
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

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    return;
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return;
  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SubmitAction;
  switch (action._action) {
    case "markAsUnRead": {
      const postId = action.postId;
      return await markAsUnRead(user.id, postId);
    }
    case "markAsAllRead": {
      const posts = await getPostAll();
      const postsPromise = posts.map((post) =>
        markAsRead(user.id, post.id)
      );
      await Promise.all(postsPromise);
    }
  }
  return;
};

type SubmitAction =
  | {
    _action: "markAsUnRead";
    postId: string;
  }
  | {
    _action: "markAsAllRead";
    postId: string;
  };

const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  const location = useLocation();
  const [theme, setTheme] = useTheme();
  const [state, setState] = useState<String>("");
  const fetcher = useFetcher();
  const { layout, context } = useContext(layoutContext);
  const [unreadNumber, setUnreadNumber] = useState<String>('');

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
      case "/reset_password":
        setState("auth");
        break;
      default:
        setState("feed-details");
        break;
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      // const readNumber = await getReadNumber(context.userId);
      setUnreadNumber('19');
    };

    fetchData()
      .catch(console.error);
  }, [context]);

  if (state === "empty" || state == "") return null;

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
                      value="markAsUnRead"
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
                  <fetcher.Form className="!bg-transparent p-0" method="post">
                    <Input
                      type="hidden"
                      name="postId"
                      defaultValue={context.postId}
                    />
                    <Button
                      className="!bg-transparent p-0 relative"
                      type="submit"
                      value="markAsAllRead"
                      name="_action"
                    >
                      <Icon iconName="checkmark" color="#c0c0c0" />
                      <Text className="text-[#c0c0c0] absolute right-[-10px] bottom-0">{unreadNumber}</Text>
                    </Button>
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
