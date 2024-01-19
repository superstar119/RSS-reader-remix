import { LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getUser } from "~/models/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return user ? null : redirect("/login");
};
export default function Index() {
  return <>Hello, everyone</>;
}
