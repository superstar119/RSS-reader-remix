import { Form, useActionData, useNavigate } from "@remix-run/react";
import { MetaFunction, json, redirect } from "@vercel/remix";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";

import { Heading } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { getUserByEmail, updateUser, verifyUser } from "~/models/user.server";
import { useEffect, useRef } from "react";
import { createUserSession, getUser } from "~/models/session.server";
import { toast } from "sonner";

export const meta: MetaFunction = () => [{ title: "Login | RSS Feed" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return user ? redirect("/") : null;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const password2 = formData.get("password2") as string;

  console.log(password, password2);

  if (!password || password.length <= 8)
    return json(
      { errors: "Password should be longer than 8" },
      { status: 400 }
    );
  if (password !== password2)
    return json({ errors: "Password is not matched." }, { status: 400 });

  const token = params.token as string;
  const decodedEmail = Buffer.from(token, "base64url").toString("utf-8");
  const user = await getUserByEmail(decodedEmail);

  if (!user) return json({ errors: "Unavailable token" }, { status: 400 });
  await updateUser(user.email, password);
  return json({ errors: null }, { status: 200 });
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      const { errors } = actionData;
      if (errors) {
        toast(errors, {
          action: {
            label: "Try again",
            onClick: function () {
              passwordRef.current?.focus();
            },
          },
        });
      } else {
        toast("Password was reset successfully");
        navigate("/");
      }
    }
  }, [actionData]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[400px] mx-auto min-w-[350px] h-full flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full m-[16px] flex flex-col gap-[40px] items-start box-border">
          <Heading>Reset Password</Heading>
          <Form
            className="w-full flex flex-col gap-[16px] items-start"
            method="post"
          >
            <div className="w-full flex flex-col gap-[8px] items-start">
              <Label htmlFor="email" className="text-[16px] leading-[150%]">
                New Password
              </Label>
              <Input
                type="password"
                autoFocus
                ref={passwordRef}
                name="password"
                placeholder="•••••••••••"
                className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              />
            </div>

            <div className="w-full flex flex-col gap-[8px] items-start">
              <Label htmlFor="password" className="text-[16px] leading-[150%]">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="password2"
                placeholder="•••••••••••"
                className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              />
            </div>

            <div className="w-full flex justify-between">
              <Button
                className="w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]"
                type="submit"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
