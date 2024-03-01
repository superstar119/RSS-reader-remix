import { createContext } from "react";

const Context = createContext({
  layout: "tileList",
  setLayout: (newLayout: string) => {},
  context: {
    postId: "",
    userId: "",
    unread: 0,
    link: "",
    category: "",
  },
  setContext: (newContext: any) => {},
});

export default Context;
