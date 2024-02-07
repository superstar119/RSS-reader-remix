import { createCookieSessionStorage } from "@vercel/remix";
import { createThemeSessionResolver } from "remix-themes";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    path: "/",
    secrets: ["secret"],
  },
});

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...(process.env.NODE_ENV === "production"
      ? { domain: "https://app.sortable.co", secure: true }
      : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
