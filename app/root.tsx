import { FC, HTMLAttributes } from "react";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta } from "@remix-run/react";
import { Button } from "~/components/ui/button";

import styles from "./tailwind.css";
import Navbar from "./components/layout/nav-bar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type DocumentProps = HTMLAttributes<HTMLElement> & {
  title?: string;
};

const Document: FC<DocumentProps> = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title ? title : "RSS Shared"}</title>
      </head>
      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Navbar isLogged={false} />
    </Document>
  );
}
