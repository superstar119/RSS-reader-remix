import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { Text } from "~/components/ui/text";
import { Heading } from "~/components/ui/text";
import { Icon } from "~/components/ui/icon";
import "~/assets/style.css";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const postId = url.pathname.split("/").slice(-1);

  const post = await getPost(postId[0]);
  return post;
};

const normalizeDate = (pubDateString: string) => {
  const pubDate = new Date(pubDateString);
  const date = pubDate.getDate();
  const monthNumber = pubDate.getMonth();
  const year = pubDate.getFullYear();
  let month: string;
  switch (monthNumber) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    default:
      month = "December";
      break;
  }
  return date + ". " + month + " " + year;
};

const FeedDetails = () => {
  const loadData = useLoaderData<typeof loader>();

  const pubDate = loadData
    ? normalizeDate(loadData.pubDate)
    : normalizeDate(new Date().toString());

  const areSiblings = (node1: Element, node2: Element): boolean => {
    return node1.nextElementSibling === node2;
  };

  // Process the HTML content to satisfy the image display requirement
  const processHtmlContent = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const images = Array.from(doc.querySelectorAll("img"));
    let imgContainer: HTMLDivElement | null;

    images.forEach((img, index) => {
      const nextImg = images[index + 1];

      if (nextImg && areSiblings(img, nextImg)) {
        if (!imgContainer) {
          imgContainer = doc.createElement("div");
          // Apply a class for styling of two images per row
          imgContainer.className =
            "w-full flex gap-[40px] justify-between flex-wrap";
          img.classList.add("aspect-square", "box-border", "shrink", "grow");
          img.parentNode?.insertBefore(imgContainer, img);
        }
        if (imgContainer != null) {
          img.classList.add("aspect-square", "box-border", "shrink", "grow");
          imgContainer.appendChild(img);
        }
      } else {
        imgContainer = null;
        // Apply a class or inline style for full width if not already wrapped
        img.classList.add("w-full");
      }
    });

    return doc.body.innerHTML;
  };

  const processedHTMLContent = loadData
    ? processHtmlContent(loadData.content)
    : "";

  let navigate = useNavigate();
  const id = useLocation().pathname.split('/').;

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        navigate("/feeds/list");
      }

      if (event.key === "arrowRight") {
        
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="w-[560px] flex flex-col gap-[40px] mx-auto py-[180px] pb-[80px] animate-fade-in">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <Text className="text-[#272727] mb-[6px]">{loadData?.author}</Text>
          <Heading>{loadData?.title}</Heading>
        </div>
        <Text className="text-[#c0c0c0]">{pubDate}</Text>
      </div>
      <div
        className="flex flex-col gap-[40px] w-full flex-1"
        dangerouslySetInnerHTML={{ __html: processedHTMLContent }}
      ></div>
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
