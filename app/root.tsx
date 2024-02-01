import { FC, ReactNode, useState } from "react";
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
import { markAsRead } from "./models/read.server";
import { getUser } from "./models/session.server";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./utils/session.server";
import { cn } from "./lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/remix";

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

interface LayoutProps {
  children: ReactNode;
}

type SubmitAction = {
  _action: "markAsRead";
  postId: string;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);

  if (!user) return null;
  const formData = await request.formData();
  const action = Object.fromEntries(formData.entries()) as SubmitAction;
  if (action._action === "markAsRead") {
    const postId = action.postId;
    return await markAsRead(user.id, postId);
  }
  return;
};

const Loading = () => {
  const navigation = useNavigation();
  const active = navigation.state !== "idle";

  if (!active) return null;

  return (
    <div className="w-screen h-screen bg-white bg-opacity-40 flex justify-center items-center fixed z-[100] animate-fade-in top-0 left-0">
      {" "}
      <span className="loader"></span>
    </div>
  );
};

const Document: FC<DocumentProps> = ({ children, title }) => {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script src="https://app.lemonsqueezy.com/js/lemon.js"></script>
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

const App: FC = () => (
  <Document>
    <Layout>
      <SpeedInsights />
      <Loading />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </Layout>
  </Document>
);

const AppWithProviders = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/theme">
      <App />
    </ThemeProvider>
  );
};

export default AppWithProviders;
