import { createContext } from "react";

const layoutContext = createContext({
  layout: "tileList",
  setLayout: (newLayout: string) => {},
  context: {
    postId: "",
    userId: "",
    unread: 0,
    link: "",
  },
  setContext: (newContext: any) => {},
});

export default layoutContext;
