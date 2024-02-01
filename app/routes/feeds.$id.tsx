import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { getNextRecord, getPost, getPrevRecord } from "~/models/post.server";
import { Text } from "~/components/ui/text";
import { Heading } from "~/components/ui/text";
import { Icon } from "~/components/ui/icon";
import { useEffect, useContext } from "react";
import layoutContext from "~/lib/context";
import { getUser } from "~/models/session.server";
import { copyToClipboard } from "~/components/layout/nav-bar";
import { Theme, useTheme } from "remix-themes";
import { FeedLoaderType } from "~/utils/type";
import { normalizeDate, processHtmlContent } from "~/utils/utils";

import "~/assets/style.css";
import { markAsUnRead } from "~/models/read.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const postId = url.pathname.split("/").slice(-1);

  const [user, post, next, prev] = await Promise.all([
    getUser(request),
    getPost(postId[0]),
    getNextRecord(postId[0]),
    getPrevRecord(postId[0]),
  ]);

  if (!user) return redirect("/");
  return { userId: user.id, post: post, nextId: next?.id, prevId: prev?.id };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  const formData = await request.formData();
  const postId = formData.get("postId") as string;
  if (!postId || !user) return null;
  return await markAsUnRead(user.id, postId);
};

const FeedDetails = () => {
  const navigate = useNavigate();
  const { post, userId, nextId, prevId } = useLoaderData<FeedLoaderType>();

  const pubDate = post
    ? normalizeDate(post.pubDate)
    : normalizeDate(new Date().toString());

  const { context, setContext } = useContext(layoutContext);
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    setContext({
      unread: context.unread,
      userId: userId,
      postId: post.id,
      link: post.link,
    });

    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      switch (key) {
        case "escape":
          navigate("/feeds/list");
          break;
        case "arrowright":
          if (nextId) navigate(`/feeds/${nextId}`);
          break;
        case "arrowleft":
          if (prevId) navigate(`/feeds/${prevId}`);
          break;
        case "enter":
          window.open(context.link, "_blank");
          break;
        case "c":
          copyToClipboard(context.link, () => { });
          break;
        case "s":
          navigate("/settings");
          break;
        case "t":
          setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
          break;
      }
    };

    if (typeof window !== "undefined" && post) {
      const processedHTMLContent = processHtmlContent(post.content);
      const contentDiv = document.querySelector("#container");
      if (contentDiv) contentDiv.innerHTML = processedHTMLContent;
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [navigate, nextId, prevId, theme, post]);

  return (
    <div className="w-[560px] flex flex-col gap-[40px] mx-auto py-[180px] pb-[80px] animate-fade-in">
      <div className="flex flex-col gap-[10px] animate-fade-in">
        <div className="flex flex-col">
          <Text className="text-[#272727] mb-[6px] dark:opacity-90">
            {post.author}
          </Text>
          <Heading>{post.title}</Heading>
        </div>
        <Text className="text-[#c0c0c0] dark:opacity-30 dark:text-white">
          {pubDate}
        </Text>
      </div>
      <div className="flex flex-col gap-[40px] w-full flex-1" id="container" />
      <div className="mt-[40px] flex px-[12px] py-[8px] gap-[9px] justify-center opacity-30 ">
        <Text className="text-[14px] text-[#272727]">
          Use arrow keys to go to previous/next
        </Text>
        <span className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border">
          <Icon iconName="arrowLeft" color="#272727" className="w-[14px]" />
        </span>
        <span className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border">
          <Icon iconName="arrowRight" color="#272727" className="w-[14px]" />
        </span>
      </div>
    </div>
  );
};

export default FeedDetails;
