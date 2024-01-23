import {
  createHotContext
} from "/build/_shared/chunk-P24WZNJG.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
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
  import.meta.hot.lastModified = "1706039041789.7317";
}
var layoutContext = (0, import_react.createContext)({
  layout: "tileList",
  setLayout: (newLayout) => {
  },
  theme: "dark",
  setTheme: (newTheme) => {
  },
  context: {
    postId: "",
    userId: "",
    unread: 0,
    link: ""
  },
  setContext: (newContext) => {
  }
});
var context_default = layoutContext;

export {
  context_default
};
//# sourceMappingURL=/build/_shared/chunk-7DM7OEPH.js.map
