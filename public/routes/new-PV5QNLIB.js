import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WJQOOBJF.js";
import {
  createHotContext
} from "/build/_shared/chunk-2XBJDL35.js";
import "/build/_shared/chunk-2WXVQBZM.js";
import "/build/_shared/chunk-IZFDETTZ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/new.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\new.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\new.tsx"
  );
  import.meta.hot.lastModified = "1705680054669.9644";
}
function New() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[380px]" }, void 0, false, {
    fileName: "app/routes/new.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c = New;
var _c;
$RefreshReg$(_c, "New");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  New as default
};
//# sourceMappingURL=/build/routes/new-PV5QNLIB.js.map
