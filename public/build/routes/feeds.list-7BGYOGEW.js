import {
  ThreeDots
} from "/build/_shared/chunk-GI4A5DXZ.js";
import {
  context_default
} from "/build/_shared/chunk-7DM7OEPH.js";
import {
  require_feed
} from "/build/_shared/chunk-2CXBIYV3.js";
import {
  require_post
} from "/build/_shared/chunk-LURGBB2L.js";
import {
  Text,
  cn
} from "/build/_shared/chunk-NAMH6SKH.js";
import {
  require_feed_subscription
} from "/build/_shared/chunk-NCCLRBLI.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-PI2F3LIC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Link,
  useFetcher,
  useLoaderData
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/s-ago/index.js
var require_s_ago = __commonJS({
  "node_modules/s-ago/index.js"(exports, module) {
    "use strict";
    function format(diff, divisor, unit, past, future, isInTheFuture) {
      var val = Math.round(Math.abs(diff) / divisor);
      if (isInTheFuture)
        return val <= 1 ? future : "in " + val + " " + unit + "s";
      return val <= 1 ? past : val + " " + unit + "s ago";
    }
    var units = [
      { max: 276e4, value: 6e4, name: "minute", past: "a minute ago", future: "in a minute" },
      { max: 72e6, value: 36e5, name: "hour", past: "an hour ago", future: "in an hour" },
      { max: 5184e5, value: 864e5, name: "day", past: "yesterday", future: "tomorrow" },
      { max: 24192e5, value: 6048e5, name: "week", past: "last week", future: "in a week" },
      { max: 28512e6, value: 2592e6, name: "month", past: "last month", future: "in a month" }
      // max: 11 months
    ];
    module.exports = function ago2(date, max) {
      var diff = Date.now() - date.getTime();
      if (Math.abs(diff) < 6e4)
        return "just now";
      for (var i = 0; i < units.length; i++) {
        if (Math.abs(diff) < units[i].max || max && units[i].name === max) {
          return format(diff, units[i].value, units[i].name, units[i].past, units[i].future, diff < 0);
        }
      }
      return format(diff, 31536e6, "year", "last year", "in a year", diff < 0);
    };
  }
});

// app/routes/feeds.list.tsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);

// app/assets/preview-placeholder.png
var preview_placeholder_default = "/build/_assets/preview-placeholder-LLBZR4IN.png";

// app/routes/feeds.list.tsx
var import_react2 = __toESM(require_react(), 1);
var import_feed_subscription = __toESM(require_feed_subscription(), 1);
var import_post = __toESM(require_post(), 1);
var import_s_ago = __toESM(require_s_ago(), 1);

// app/components/layout/side-bar.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\layout\\\\side-bar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\layout\\side-bar.tsx"
  );
  import.meta.hot.lastModified = "1706040014983.0093";
}
var Sidebar = ({
  items
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[22px] w-[220px] max-w-[220px] opacity-0 hover:opacity-100 transition-opacity transition-duration-500", children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-[5px] items-baseline w-[200px] ", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#000] truncate ", children: item.item }, void 0, false, {
      fileName: "app/components/layout/side-bar.tsx",
      lineNumber: 27,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("sup", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#c0c0c0] text-[14px]", children: item.unread }, void 0, false, {
      fileName: "app/components/layout/side-bar.tsx",
      lineNumber: 29,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/layout/side-bar.tsx",
      lineNumber: 28,
      columnNumber: 11
    }, this)
  ] }, index, true, {
    fileName: "app/components/layout/side-bar.tsx",
    lineNumber: 26,
    columnNumber: 35
  }, this)) }, void 0, false, {
    fileName: "app/components/layout/side-bar.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
};
_c = Sidebar;
var _c;
$RefreshReg$(_c, "Sidebar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/feeds.list.tsx
var import_feed = __toESM(require_feed(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\feeds.list.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\feeds.list.tsx"
  );
  import.meta.hot.lastModified = "1706039928344.5427";
}
var InfiniteScroller = (props) => {
  _s();
  const {
    children,
    loading,
    loadNext
  } = props;
  const scrollListener = (0, import_react2.useRef)(loadNext);
  (0, import_react2.useEffect)(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);
  const onScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
    const scrollEnded = documentHeight == scrollDifference;
    if (scrollEnded && !loading) {
      scrollListener.current();
    }
  };
  (0, import_react2.useEffect)(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children }, void 0, false, {
    fileName: "app/routes/feeds.list.tsx",
    lineNumber: 96,
    columnNumber: 10
  }, this);
};
_s(InfiniteScroller, "BAsJnOth0ocrxnb72irYp7lpUkI=");
_c2 = InfiniteScroller;
var FeedList = () => {
  _s2();
  const initial = useLoaderData();
  const fetcher = useFetcher();
  const {
    layout
  } = (0, import_react2.useContext)(context_default);
  const [posts, setPosts] = (0, import_react2.useState)(initial.data);
  (0, import_react2.useEffect)(() => {
    if (!fetcher.data || fetcher.state === "loading")
      return;
    if (fetcher.data) {
      const newItems = fetcher.data.data;
      setPosts((prevPosts) => [...prevPosts, ...newItems]);
    }
  }, [fetcher.data]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative w-full h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "fixed top-[230px] left-[40px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Sidebar, { items: initial.sidebarData }, void 0, false, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InfiniteScroller, { loadNext: () => {
      const page = fetcher.data ? Number(fetcher.data.page) + 1 : Number(initial.page) + 1;
      const query = `?page=${page}`;
      fetcher.load(query);
    }, loading: fetcher.data === "loading", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: cn("w-[590px] mx-auto mt-[180px] animate-fade-in", layout === "imageList" ? "grid grid-cols-2" : "flex flex-col gap-[10px]"), children: [
      posts.map((item, index) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: `/feeds/${item.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: cn("flex px-[15px] gap-[15px] items-center", layout === "textList" ? "py-[12px]" : layout === "imageList" ? "py-[15px] flex-col" : "py-[15px]"), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: cn(" bg-cover bg-center rounded-[3px]", layout === "textList" ? "hidden" : layout === "imageList" ? "w-full aspect-square" : "w-[60px] min-w-[60px] min-h-[60px] h-[60px]"), style: {
            backgroundImage: `url(${item.imgSrc ? item.imgSrc : preview_placeholder_default})`
          } }, void 0, false, {
            fileName: "app/routes/feeds.list.tsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col gap-[5px] w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { className: "truncate w-full overflow-hidden", children: item.title }, void 0, false, {
              fileName: "app/routes/feeds.list.tsx",
              lineNumber: 132,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { className: "text-[14px] text-[#c0c0c0]", children: item.author + " / " + (0, import_s_ago.default)(new Date(item.pubDate)) }, void 0, false, {
              fileName: "app/routes/feeds.list.tsx",
              lineNumber: 135,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/feeds.list.tsx",
            lineNumber: 131,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/feeds.list.tsx",
          lineNumber: 127,
          columnNumber: 17
        }, this) }, index, false, {
          fileName: "app/routes/feeds.list.tsx",
          lineNumber: 126,
          columnNumber: 18
        }, this);
      }),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full flex justify-center items-center py-[20px] mb-[180px]", children: fetcher.state === "loading" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ThreeDots, { fill: "#c0c0c0", className: "w-[40px] h-[20px]" }, void 0, false, {
        fileName: "app/routes/feeds.list.tsx",
        lineNumber: 143,
        columnNumber: 45
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.list.tsx",
        lineNumber: 142,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 119,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/feeds.list.tsx",
    lineNumber: 115,
    columnNumber: 10
  }, this);
};
_s2(FeedList, "qDvZC8QsjprKOS5ONKP9l9rAfCc=", false, function() {
  return [useLoaderData, useFetcher];
});
_c22 = FeedList;
var feeds_list_default = FeedList;
var _c2;
var _c22;
$RefreshReg$(_c2, "InfiniteScroller");
$RefreshReg$(_c22, "FeedList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  feeds_list_default as default
};
//# sourceMappingURL=/build/routes/feeds.list-7BGYOGEW.js.map
