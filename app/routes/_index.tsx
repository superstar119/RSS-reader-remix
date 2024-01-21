import { User } from "@prisma/client";
import { LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserFeeds } from "~/models/feed.server";
import { getUser } from "~/models/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);

  if (!user) return redirect("/login");
  else {
    const feeds = await getUserFeeds(user.id);
    console.log(feeds);
    if (!feeds || !feeds.length) return redirect("/feeds");
    return redirect("/feeds/list");
  }
};
export default function Index() {
  const user = useLoaderData<User>();

  return <>Hello, everyone</>;
}
