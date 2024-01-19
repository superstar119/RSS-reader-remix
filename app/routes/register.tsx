import { useEffect, useRef } from "react";
import { Form, Link, MetaFunction, useActionData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createUser, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils/utils";
import { Heading } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { createUserSession } from "~/models/session.server";

export const meta: MetaFunction = () => [{ title: "Register | RSS Feed" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }
  const user = await createUser(email, password);
  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: user.id,
  });
};

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.errors.email) {
      emailRef.current?.focus();
    }

    if (actionData?.errors.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);
  return (
    <div className="max-w-[400px] mx-auto mt-[90px] mx-auto min-w-[350px] box-border">
      <div className="w-full m-[16px] flex flex-col gap-[40px] items-start box-border">
        <Heading>Sign up</Heading>

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
              autoFocus={true}
              name="email"
              ref={emailRef}
              aria-invalid={actionData?.errors.email ? true : undefined}
              required
              placeholder="richard@piedpiper.com"
              className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
            />
            {actionData?.errors.email && (
              <div className="pt-1 text-red-700 animate-fade-in">
                {actionData.errors.email}
              </div>
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
              className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              required
              placeholder="•••••••••••"
            />
            {actionData?.errors.password && (
              <div className="pt-1 text-red-700 animate-fade-in">
                {actionData.errors.password}
              </div>
            )}
          </div>

          <div className="w-full flex justify-start">
            <Button
              className="w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]"
              type="submit"
            >
              Create account
            </Button>
          </div>
        </Form>

        <div className="text-[#7b7b7b] text-[16px] leading-[150%] font-normal">
          Or{" "}
          <Link
            className="underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal"
            to={{ pathname: "/login" }}
          >
            login
          </Link>{" "}
          if you have an account.
        </div>
      </div>
    </div>
  );
}
