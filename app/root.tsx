import { FC, useState } from "react";
import { LinksFunction, LoaderFunctionArgs, json } from "@vercel/remix";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

// import stylesheets
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./tailwind.css";
import { Navbar } from "./components/layout/nav-bar";
import { Toaster } from "./components/ui/sonner";
import { Loading } from "./components/layout/loading";
import layoutContext from "./lib/context";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./utils/session.server";

import { ContextType, DocumentProps, LayoutProps } from "./utils/type";
import { cn } from "./lib/utils";
import { createThemeAction } from "remix-themes";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  return json({
    theme: getTheme(),
  });
};

export const action = createThemeAction(themeSessionResolver);

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: styles },
      ]
    : []),
];

export const meta: MetaFunction = () => {
  return [
    { title: "Rss Feed Reader" },
    { name: "description", content: "This app is the best rss reader" },
  ];
};

const Document: FC<DocumentProps> = ({ children, title }) => {
  const loadData = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>RSS Feed</title>
        <PreventFlashOnWrongTheme ssrTheme={Boolean(loadData.theme)} />
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
  const [context, setContext] = useState<ContextType>({
    userId: "",
    postId: "",
    unread: 0,
    link: "",
    category: "all",
  });

  const layoutValue = {
    layout,
    setLayout,
    context: context,
    setContext: setContext,
  };

  return (
    <layoutContext.Provider value={layoutValue}>
      <div className="bg-white dark:bg-slate-950 transition-all transition-duration-500 w-full min-h-screen flex flex-col max-w-screen justify-start items-center">
        <Navbar />
        {children}
      </div>
    </layoutContext.Provider>
  );
};

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/">
      <Document>
        <Layout>
          <Loading />
          <Toaster />
          <ScrollRestoration />
          <Outlet />
          <Scripts />
        </Layout>
      </Document>
    </ThemeProvider>
  );
}
