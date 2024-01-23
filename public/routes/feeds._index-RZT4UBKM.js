import {
  Button
} from "/build/_shared/chunk-O3EPNBLP.js";
import "/build/_shared/chunk-3ENBOG2J.js";
import {
  Heading,
  Text
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
  Link
} from "/build/_shared/chunk-DLGYDX44.js";
import {
  createHotContext
} from "/build/_shared/chunk-2XBJDL35.js";
import "/build/_shared/chunk-2WXVQBZM.js";
import "/build/_shared/chunk-SIXOC54Y.js";
import "/build/_shared/chunk-IZFDETTZ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/feeds._index.tsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_feed_subscription = __toESM(require_feed_subscription(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\feeds._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\feeds._index.tsx"
  );
  import.meta.hot.lastModified = "1705927415639.8452";
}
function FeedsIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[380px] flex flex-col mx-auto justify-center items-start gap-[24px] flex-grow animate-fade-in", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col justify-center items-stretch gap-[8px]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { className: "w-full", children: "Add the first feed" }, void 0, false, {
        fileName: "app/routes/feeds._index.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "w-full", children: "Subscribe to any feed by simply pasting in the URL (it\u2019s often the website URL ending in /feed/)." }, void 0, false, {
        fileName: "app/routes/feeds._index.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds._index.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "w-[120px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]", children: "Add first feed" }, void 0, false, {
      fileName: "app/routes/feeds._index.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/feeds._index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/feeds._index.tsx",
    lineNumber: 37,
    columnNumber: 10
  }, this);
}
_c = FeedsIndexPage;
var _c;
$RefreshReg$(_c, "FeedsIndexPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  FeedsIndexPage as default
};
//# sourceMappingURL=/build/routes/feeds._index-RZT4UBKM.js.map
