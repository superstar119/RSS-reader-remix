import {
  context_default
} from "/build/_shared/chunk-NA2D3NNW.js";
import {
  require_feed
} from "/build/_shared/chunk-2CXBIYV3.js";
import {
  require_post
} from "/build/_shared/chunk-LURGBB2L.js";
import {
  Text,
  cn
} from "/build/_shared/chunk-IZHGTWOW.js";
import {
  require_feed_subscription
} from "/build/_shared/chunk-NCCLRBLI.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-PI2F3LIC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WJQOOBJF.js";
import {
  Link,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-DLGYDX44.js";
import {
  createHotContext
} from "/build/_shared/chunk-2XBJDL35.js";
import "/build/_shared/chunk-2WXVQBZM.js";
import "/build/_shared/chunk-SIXOC54Y.js";
import {
  require_react
} from "/build/_shared/chunk-IZFDETTZ.js";
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
var import_react14 = __toESM(require_react(), 1);
var import_feed_subscription = __toESM(require_feed_subscription(), 1);
var import_post = __toESM(require_post(), 1);

// node_modules/react-loading-icons/dist/esm/components/audio.js
var import_react = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/ball-triangle.js
var import_react2 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/bars.js
var import_react3 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/circles.js
var import_react4 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/grid.js
var import_react5 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/hearts.js
var import_react6 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/oval.js
var import_react7 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/puff.js
var import_react8 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/rings.js
var import_react9 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/spinning-circles.js
var import_react10 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/tail-spin.js
var import_react11 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/three-dots.js
var import_react12 = __toESM(require_react());
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function ThreeDots(props) {
  var _a, _b, _c3, _d;
  var speed = Number(String((_a = props.speed) !== null && _a !== void 0 ? _a : 1));
  var fill = (_b = props.fill) !== null && _b !== void 0 ? _b : "#fff";
  var stroke = props.stroke;
  var fillOpacity = props.fillOpacity;
  var strokeOpacity = props.strokeOpacity;
  return import_react12.default.createElement(
    "svg",
    __assign({}, __assign(__assign({}, props), { className: props.className ? "icon-loading ".concat(props.className) : "icon-loading", fill: void 0, fillOpacity: void 0, height: (_c3 = props.height) !== null && _c3 !== void 0 ? _c3 : 30, speed: void 0, stroke: void 0, strokeOpacity: void 0, strokeWidth: void 0, width: (_d = props.width) !== null && _d !== void 0 ? _d : 120 }), { viewBox: "0 0 120 30" }),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 15, cy: 15, r: 15 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 15, to: 15, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 1, to: 1, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })
    ),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 60, cy: 15, r: 9 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 9, to: 9, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "9;15;9", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 0.5, to: 0.5, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: ".5;1;.5", calcMode: "linear", repeatCount: "indefinite" })
    ),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 105, cy: 15, r: 15 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 15, to: 15, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 1, to: 1, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })
    )
  );
}

// node_modules/react-loading-icons/dist/esm/index.js
var ThreeDots2 = ThreeDots;

// app/routes/feeds.list.tsx
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
  import.meta.hot.lastModified = "1705952733894.0017";
}
var Sidebar = ({
  items
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[22px] w-[220px] max-w-[220px] opacity-0 hover:opacity-100 transition-opacity transition-duration-500", children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-[5px] items-baseline", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#000]", children: item.item }, void 0, false, {
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
  import.meta.hot.lastModified = "1706020935876.5908";
}
var InfiniteScroller = (props) => {
  _s();
  const {
    children,
    loading,
    loadNext
  } = props;
  const scrollListener = (0, import_react14.useRef)(loadNext);
  (0, import_react14.useEffect)(() => {
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
  (0, import_react14.useEffect)(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children }, void 0, false, {
    fileName: "app/routes/feeds.list.tsx",
    lineNumber: 95,
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
  } = (0, import_react14.useContext)(context_default);
  const [posts, setPosts] = (0, import_react14.useState)(initial.data);
  (0, import_react14.useEffect)(() => {
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
      lineNumber: 116,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 115,
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
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col gap-[5px] w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { className: "truncate w-full overflow-hidden", children: item.title }, void 0, false, {
              fileName: "app/routes/feeds.list.tsx",
              lineNumber: 131,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { className: "text-[14px] text-[#c0c0c0]", children: item.author + " / " + (0, import_s_ago.default)(new Date(item.pubDate)) }, void 0, false, {
              fileName: "app/routes/feeds.list.tsx",
              lineNumber: 134,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/feeds.list.tsx",
            lineNumber: 130,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/feeds.list.tsx",
          lineNumber: 126,
          columnNumber: 17
        }, this) }, index, false, {
          fileName: "app/routes/feeds.list.tsx",
          lineNumber: 125,
          columnNumber: 18
        }, this);
      }),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full flex justify-center items-center py-[20px] mb-[180px]", children: fetcher.state === "loading" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ThreeDots2, { fill: "#c0c0c0", className: "w-[40px] h-[20px]" }, void 0, false, {
        fileName: "app/routes/feeds.list.tsx",
        lineNumber: 142,
        columnNumber: 45
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.list.tsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 123,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/feeds.list.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/feeds.list.tsx",
    lineNumber: 114,
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
//# sourceMappingURL=/build/routes/feeds.list-VREUQPAN.js.map
