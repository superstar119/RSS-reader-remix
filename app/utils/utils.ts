import { parse } from "node-html-parser";
import Parser from "rss-parser";
import he from "he";

import {
  MediaType,
  PostType,
  PREVIEW_MIN_WIDTH,
  YOUTUBE_HOSTNAME,
} from "./type";

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const compareByDate = (a: any, b: any): number => {
  return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
};

export const parseRSS = async (url: string) => {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["content:encoded", "contentEncoded"],
          ["description", "description"],
          ["media:content", "mediaContent"],
        ],
      },
    });

    const response = await fetch(url, {
      headers: new Headers({
        "content-Type": "text/xml",
      }),
    });
    if (!response.ok) return { title: "", posts: [] };
    const payload = await response.text();
    const feed = await parser.parseString(payload);

    const postsPromise = feed.items.map(async (item) => {
      const title = item.title as string;
      const pubDate = item.pubDate as string;
      const link = item.link as string;

      let content = (
        item.contentEncoded
          ? item.contentEncoded
          : item.content
          ? item.content
          : item.description
      ) as string;

      let imgSrc: string, imgSrcType: string;

      if (item.mediaContent) {
        const mediaContent = item.mediaContent["$"];
        imgSrc = mediaContent.url;
        imgSrcType = "img";
        content = `<img src='${imgSrc}' />` + content;
      } else {
        let preview = await getImageSrc(content);
        if (preview) {
          imgSrc = preview.src;
          imgSrcType = preview.type;
        } else {
          preview = await getImageFromURL(link);
          if (preview) {
            imgSrc = preview.src;
            imgSrcType = preview.type;
          } else {
            imgSrc = "";
            imgSrcType = "img";
          }
        }

        if (imgSrcType === "iframe") {
          const parsedUrl = new URL(imgSrc);
          const hostname = parsedUrl.hostname;

          if (hostname === YOUTUBE_HOSTNAME) {
            imgSrcType = "youtube";
            const id = imgSrc.split("/").pop();
            imgSrc = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
          }
        }
      }

      return {
        title,
        pubDate,
        content,
        link,
        imgSrc,
        imgSrcType,
      } as PostType;
    });

    const title = await getTitleFromURL((feed.link || feed.feedUrl) as string);
    const posts = await Promise.all(postsPromise);

    return { title, posts };
  } catch (err) {
    console.log(err);
    return { title: "", posts: [] };
  }
};

const getImageFromURL = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) return null;
  const html = await response.text();
  return getImageSrc(html);
};

const getTitleFromURL = async (url: string): Promise<string> => {
  const Url = new URL(url);
  const hostname = await Url.host;
  const protocol = await Url.protocol;
  const response = await fetch(protocol.concat("//", hostname));
  if (!response.ok) return await Url.hostname;
  const html = await response.text();
  const titleElement = parse(html).querySelector("title");
  const title = he.decode(titleElement?.innerHTML as string);
  return title as string;
};

const getImageSrc = async (item: string) => {
  const html = parse(item);
  const image = html.querySelector("img");
  const iframe = html.querySelector("iframe");

  let mediaElements: Array<MediaType> = [];
  if (image) {
    let isValid: boolean = true;
    if (image.getAttribute("width"))
      isValid = Number(image.getAttribute("width")) > PREVIEW_MIN_WIDTH;

    if (isValid) mediaElements.push({ type: "img", value: image });
  }
  if (iframe) mediaElements.push({ type: "iframe", value: iframe });

  mediaElements.sort((a, b) => {
    const positionA = item.indexOf(a.value.outerHTML);
    const positionB = item.indexOf(b.value.outerHTML);
    if (positionA < positionB) return -1;
    else if (positionA > positionB) return 1;
    return 0;
  });

  if (mediaElements.length > 0) {
    const preview: MediaType = mediaElements[0];
    const src = preview.value.getAttribute("src") as string;
    const type = preview.type;
    return { src, type };
  }
  return null;
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
  let count: number;
  images.forEach((img, index) => {
    const nextImg = images[index + 1];
    img.style.setProperty("height", "auto", "important");
    img.classList.add("rounded-sm");
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

export const copyToClipboard = async (
  text: string,
  callback: (title: string, val: object) => void
) => {
  if (!navigator.clipboard) {
    console.warn("Clipboard not available");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    callback("Link copied successfully", {});
  } catch (err) {
    callback("Failed to copy to clipboard", {
      variant: "destructive",
    });
  }
};

export const generateResetToken = (email: string) => {
  return Buffer.from(email).toString("base64url");
};
