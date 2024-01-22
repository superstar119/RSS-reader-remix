import { createContext } from "react";

const layoutContext = createContext({
  layout: "tileList",
  setLayout: (newState: any) => {},
});

export default layoutContext;
