import {
  context_default
} from "/build/_shared/chunk-7DM7OEPH.js";
import {
  Icon
} from "/build/_shared/chunk-CX4YP66B.js";
import {
  require_post
} from "/build/_shared/chunk-LURGBB2L.js";
import {
  Heading,
  Text
} from "/build/_shared/chunk-NAMH6SKH.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-PI2F3LIC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  useLoaderData,
  useNavigate
} from "/build/_shared/chunk-WY7KWJWX.js";
import {
  createHotContext
} from "/build/_shared/chunk-P24WZNJG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/feeds.$id.tsx
var import_node = __toESM(require_node(), 1);
var import_post = __toESM(require_post(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_session = __toESM(require_session(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\feeds.$id.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\feeds.$id.tsx"
  );
}
var normalizeDate = (pubDateString) => {
  const pubDate = new Date(pubDateString);
  const date = pubDate.getDate();
  const monthNumber = pubDate.getMonth();
  const year = pubDate.getFullYear();
  let month;
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
var FeedDetails = () => {
  _s();
  const loadData = useLoaderData();
  const {
    context,
    setContext
  } = (0, import_react2.useContext)(context_default);
  const pubDate = loadData ? normalizeDate(loadData.post.pubDate) : normalizeDate((/* @__PURE__ */ new Date()).toString());
  const areSiblings = (node1, node2) => {
    return node1.nextElementSibling === node2;
  };
  function processHtmlContent(htmlString) {
    let parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const images = Array.from(doc.querySelectorAll("img"));
    let imgContainer;
    images.forEach((img, index) => {
      const nextImg = images[index + 1];
      if (nextImg && areSiblings(img, nextImg)) {
        if (!imgContainer) {
          imgContainer = doc.createElement("div");
          imgContainer.className = "w-full flex gap-[40px] justify-between flex-wrap";
          img.classList.add("aspect-square", "box-border", "shrink", "grow");
          img.parentNode?.insertBefore(imgContainer, img);
        }
        if (imgContainer != null) {
          img.classList.add("aspect-square", "box-border", "shrink", "grow");
          imgContainer.appendChild(img);
        }
      } else {
        imgContainer = null;
        img.classList.add("w-full");
      }
    });
    return doc.body.innerHTML;
  }
  const processedHTMLContent = loadData ? processHtmlContent(loadData.post.content) : "";
  let navigate = useNavigate();
  (0, import_react2.useEffect)(() => {
    setContext({
      unread: context.unread,
      userId: loadData.userId,
      postId: loadData.post.id,
      link: loadData.post.link
    });
    function handleKeydown(event) {
      if (event.key === "Escape") {
        navigate("/feeds/list");
      }
      if (event.key === "ArrowRight" && loadData.nextId) {
        navigate(`/feeds/${loadData.nextId}`);
      }
      if (event.key === "ArrowLeft" && loadData.prevId) {
        navigate(`/feeds/${loadData.prevId}`);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [navigate, loadData.nextId, loadData.prevId]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[560px] flex flex-col gap-[40px] mx-auto py-[180px] pb-[80px] animate-fade-in", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[10px] animate-fade-in", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#272727] mb-[6px]", children: loadData?.post.author }, void 0, false, {
          fileName: "app/routes/feeds.$id.tsx",
          lineNumber: 160,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { children: loadData?.post.title }, void 0, false, {
          fileName: "app/routes/feeds.$id.tsx",
          lineNumber: 163,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 159,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#c0c0c0]", children: pubDate }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 158,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[40px] w-full flex-1", dangerouslySetInnerHTML: {
      __html: processedHTMLContent
    } }, void 0, false, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 167,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-[40px] flex px-[12px] py-[8px] gap-[9px] justify-center opacity-30 ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[14px] text-[#272727]", children: "Use arrow keys to go to previous/next" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 172,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { iconName: "arrowLeft", color: "#272727", className: "w-[14px]" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 176,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { iconName: "arrowRight", color: "#272727", className: "w-[14px]" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 179,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 178,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 171,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/feeds.$id.tsx",
    lineNumber: 157,
    columnNumber: 10
  }, this);
};
_s(FeedDetails, "Ym/07uQtV2FdZPv9tB+A2mIjWU0=", false, function() {
  return [useLoaderData, useNavigate];
});
_c = FeedDetails;
var feeds_id_default = FeedDetails;
var _c;
$RefreshReg$(_c, "FeedDetails");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  feeds_id_default as default
};
//# sourceMappingURL=/build/routes/feeds.$id-SN5DMBLK.js.map
