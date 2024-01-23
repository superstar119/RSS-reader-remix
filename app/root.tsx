import {
  FC,
  ReactNode,
  useState,
  createContext,
  useContext,
  Suspense,
} from "react";
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar from "./components/layout/nav-bar";
import layoutContext from "./lib/context";
import { ThreeDots } from "react-loading-icons";

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

interface LayoutProps {
  children: ReactNode;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const Loading = () => {
  return (
    <div className="w-screen h-screen bg-white bg-opacity-30 flex justify-center items-center">
      <ThreeDots />
    </div>
  );
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>

        <ScrollRestoration />
        <Scripts />
      </Layout>
    </Document>
  );
}

const Document: FC<DocumentProps> = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{title ? title : "RSS Feed"}</title>
      </head>
      <body className="w-full h-screen min-h-screen flex flex-col max-w-screen pr-[8px]">
        {children}
        <LiveReload />
      </body>
    </html>
  );
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const [layout, setLayout] = useState<string>("tileList");

  const layoutValue = { layout, setLayout };

  return (
    <layoutContext.Provider value={layoutValue}>
      <Navbar />
      {children}
    </layoutContext.Provider>
  );
};
