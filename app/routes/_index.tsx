import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { getUserFeedSubscription } from "~/models/feed-subscription.server";
import { getUser } from "~/models/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);

  if (!user) return redirect("/login");
  else {
    const feeds = await getUserFeedSubscription(user.id);

    if (!feeds || !feeds.length) return redirect("/feeds");
    return redirect("/feeds/list");
  }
};

export default function Index() {
  return <></>;
}
