import { FC, ReactNode } from "react";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet } from "@remix-run/react";
import styles from "./tailwind.css";
import Navbar from "./components/layout/nav-bar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

interface LayoutProps {
  children: ReactNode;
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
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
        <title>{title ? title : "Remix Blog"}</title>
      </head>
      <body>
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
