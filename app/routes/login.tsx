import { Form, Link, useActionData } from "@remix-run/react";
import { MetaFunction, json, redirect } from "@vercel/remix";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";
import { validateEmail } from "~/utils/utils";
import { Heading } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { verifyUser } from "~/models/user.server";
import { useRef } from "react";
import { createUserSession, getUser } from "~/models/session.server";

export const meta: MetaFunction = () => [{ title: "Login | RSS Feed" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return user ? redirect("/") : null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid.", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required." } },
      { status: 400 }
    );
  }

  const user = await verifyUser(email, password);

  if (user === null)
    return json(
      { errors: { email: "User is not registered.", password: null } },
      { status: 400 }
    );

  if (typeof user === "boolean") {
    return json(
      { errors: { email: null, password: "Password is invalid." } },
      { status: 400 }
    );
  }
  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: user.id,
  });
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[400px] mx-auto min-w-[350px] h-full flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full m-[16px] flex flex-col gap-[40px] items-start box-border">
          <Heading>Login</Heading>
          <Form
            className="w-full flex flex-col gap-[16px] items-start"
            method="post"
          >
            <div className="w-full flex flex-col gap-[8px] items-start">
              <Label htmlFor="email" className="text-[16px] leading-[150%]">
                Email address
              </Label>
              <Input
                type="email"
                id="email"
                autoFocus
                ref={emailRef}
                name="email"
                placeholder="richard@piedpiper.com"
                className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              />
              {actionData?.errors.email && (
                <span className="!text-red-600">{actionData.errors.email}</span>
              )}
            </div>

            <div className="w-full flex flex-col gap-[8px] items-start">
              <Label htmlFor="password" className="text-[16px] leading-[150%]">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="•••••••••••"
                className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              />
              {actionData?.errors.password && (
                <span className="!text-red-600">
                  {actionData.errors.password}
                </span>
              )}
            </div>

            <div className="w-full flex justify-between">
              <Button
                className="w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]"
                type="submit"
              >
                Login
              </Button>
              <Link
                to="/reset"
                className="text-[#7b7b7b] underline p-0 font-normal"
              >
                Forgot password?
              </Link>
            </div>
          </Form>

          <div className="text-[#7b7b7b] text-[16px] leading-[150%] font-normal">
            Or{" "}
            <Link
              className="underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal"
              to={{ pathname: "/register" }}
            >
              sign up
            </Link>{" "}
            if you don't have an account.
          </div>
        </div>
      </div>
    </div>
  );
}
