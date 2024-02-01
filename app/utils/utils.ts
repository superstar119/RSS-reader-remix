import { parse } from "node-html-parser";
import Parser from "rss-parser";

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const compareByDate = (a: any, b: any): number => {
  return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
};

export const fetchRSSFeed = async (url: string) => {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["content:encoded", "contentEncoded"],
          ["description", "description"],
          ["dc:creator", "author", { keepArray: true }],
        ],
      },
    });
    const feed = await parser.parseURL(url);

    const posts = feed.items.map((item) => {
      return {
        title: item.title || "",
        pubDate: item.pubDate || item.isoDate || Date.now.toString(),
        content: item.contentEncoded || item.content || item.description || "",
        author: item.creator || item.author || "",
        link: item.link || "",
        imgSrc: extractImageSrc(item),
      };
    });

    const title = feed.title || url;
    return { title, posts };
  } catch (err) {
    console.error("Error fetching RSS Feed: ", err);
    return { title: "", posts: [] };
  }
};

export const extractImageSrc = (item: any): string => {
  if (item.enclosure && item.enclosure.type?.startsWith("image/")) {
    return item.enclosure.url;
  }

  const content = item.contentEncoded || item.content || item.description || "";

  const html = parse(content);
  const imgElement = html.querySelector("img");
  const match = imgElement?.getAttribute("src");

  return match ? match : "";
};

export const normalizeDate = (pubDateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(pubDateString));
};

const areSiblings = (node1: Element, node2: Element): boolean => {
  return node1.nextElementSibling === node2;
};

// Process the HTML content to satisfy the image display requirement
export const processHtmlContent = (htmlString: string): string => {
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
        img.classList.add(
          "aspect-square",
          "box-border",
          "shrink",
          "grow",
          "w-1/2"
        );
        img.parentNode?.insertBefore(imgContainer, img);
      }
      if (imgContainer != null) {
        img.classList.add(
          "aspect-square",
          "box-border",
          "shrink",
          "grow",
          "w-1/2"
        );
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

export const reorder = <TItem>(
  list: TItem[],
  startIndex: number,
  endIndex: number
): TItem[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
