import { FC, ReactNode } from "react";
import { LinksFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
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

export default function App() {
  return (
    <Document>
      <Layout>
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
      <body className="w-full h-screen flex flex-col">
        {children}
        <LiveReload />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar isLogged={false} />

      {children}
    </>
  );
};
