import {
  Icon
} from "/build/_shared/chunk-3SVKHLYE.js";
import {
  require_post
} from "/build/_shared/chunk-LURGBB2L.js";
import {
  Heading,
  Text
} from "/build/_shared/chunk-IZHGTWOW.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WJQOOBJF.js";
import {
  useLoaderData,
  useLocation,
  useNavigate
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
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/feeds.$id.tsx
var import_post = __toESM(require_post(), 1);
var import_react2 = __toESM(require_react(), 1);
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
  const pubDate = loadData ? normalizeDate(loadData.pubDate) : normalizeDate((/* @__PURE__ */ new Date()).toString());
  const areSiblings = (node1, node2) => {
    return node1.nextElementSibling === node2;
  };
  const processHtmlContent = (htmlString) => {
    const parser = new DOMParser();
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
  };
  const processedHTMLContent = loadData ? processHtmlContent(loadData.content) : "";
  let navigate = useNavigate();
  const id = useLocation().pathname.split("/").slice(-1).at(0);
  (0, import_react2.useEffect)(() => {
    function handleKeydown(event) {
      if (event.key === "Escape") {
        navigate("/feeds/list");
      }
      if (event.key === "arrowRight") {
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[560px] flex flex-col gap-[40px] mx-auto py-[180px] pb-[80px] animate-fade-in", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[10px]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#272727] mb-[6px]", children: loadData?.author }, void 0, false, {
          fileName: "app/routes/feeds.$id.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { children: loadData?.title }, void 0, false, {
          fileName: "app/routes/feeds.$id.tsx",
          lineNumber: 135,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[#c0c0c0]", children: pubDate }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-[40px] w-full flex-1", dangerouslySetInnerHTML: {
      __html: processedHTMLContent
    } }, void 0, false, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-[40px] flex px-[12px] py-[8px] gap-[9px] justify-center opacity-30 ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-[14px] text-[#272727]", children: "Use arrow keys to go to previous/next" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { iconName: "arrowLeft", color: "#272727", className: "w-[14px]" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-[20px] h-[20px] min-w-[20px] min-h-[20px] flex justify-center items-center rounded-[4px] border-[#272727] bg-[#f1f1f1] border", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { iconName: "arrowRight", color: "#272727", className: "w-[14px]" }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 151,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/feeds.$id.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/feeds.$id.tsx",
      lineNumber: 143,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/feeds.$id.tsx",
    lineNumber: 131,
    columnNumber: 10
  }, this);
};
_s(FeedDetails, "5WPKCa5Cb03E9CpKw+pMfTiUJQA=", false, function() {
  return [useLoaderData, useNavigate, useLocation];
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
//# sourceMappingURL=/build/routes/feeds.$id-QDJZQGAG.js.map
