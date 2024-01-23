import { FC, ReactNode, useContext, useState } from "react";
import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import styles from "./tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar, { NavbarData } from "./components/layout/nav-bar";
import layoutContext from "./lib/context";
import { ThreeDots } from "react-loading-icons";
import { markAsRead } from "./models/read.server";
import { getUser } from "./models/session.server";

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

type SubmitAction = {
  _action: "markAsRead";
  postId: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  if (!user) return;
  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SubmitAction;
  if (action._action === "markAsRead") {
    const postId = action.postId;
    return await markAsRead(user.id, postId);
  }
  return;
};

export const Loading = () => {
  const navigation = useNavigation();
  const active = navigation.state !== "idle";

  if (!active) return null;

  return (
    <div className="w-screen h-screen bg-white bg-opacity-60 flex justify-center items-center fixed z-[100] animate-fade-in">
      <ThreeDots fill="#c0c0c0" className="w-[80px]" />
    </div>
  );
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Loading />
        <Outlet />
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
  const [navData, setNavData] = useState<NavbarData>({
    userId: "",
    postId: "",
    unread: 0,
    link: "",
  });
  const [theme, setTheme] = useState<string>("dark");

  const layoutValue = {
    layout,
    setLayout,
    theme,
    setTheme,
    context: navData,
    setContext: setNavData,
  };

  return (
    <layoutContext.Provider value={layoutValue}>
      <Navbar />
      {children}
    </layoutContext.Provider>
  );
};
