import {
  createHotContext
} from "/build/_shared/chunk-2XBJDL35.js";
import {
  require_react
} from "/build/_shared/chunk-IZFDETTZ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/lib/context.ts
var import_react = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\context.ts"
  );
  import.meta.hot.lastModified = "1705939838517.3623";
}
var layoutContext = (0, import_react.createContext)({
  layout: "tileList",
  setLayout: (newState) => {
  }
});
var context_default = layoutContext;

export {
  context_default
};
//# sourceMappingURL=/build/_shared/chunk-NA2D3NNW.js.map
