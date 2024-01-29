import { FC, ReactNode, useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import styles from "./tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar, { NavbarData } from "./components/layout/nav-bar";
import layoutContext from "./lib/context";
import { ThreeDots } from "react-loading-icons";
import { markAsRead } from "./models/read.server";
import { getUser } from "./models/session.server";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./utils/session.server";
import { cn } from "./lib/utils";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

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
    <div className="w-screen h-screen bg-white bg-opacity-10 flex justify-center items-center fixed z-[100] animate-fade-in">
      <ThreeDots fill="#c0c0c0" className="w-[80px]" />
    </div>
  );
};

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
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
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
        <title>{title ? title : "RSS Feed"}</title>
      </head>
      <body>
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

  const layoutValue = {
    layout,
    setLayout,
    context: navData,
    setContext: setNavData,
  };

  return (
    <layoutContext.Provider value={layoutValue}>
      <div className="dark:bg-slate-950 transition-all transition-duration-500 w-full min-h-screen flex flex-col max-w-screen justify-center items-center">
        <Navbar />
        {children}
      </div>
    </layoutContext.Provider>
  );
};
