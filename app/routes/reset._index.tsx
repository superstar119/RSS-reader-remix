import { Form, Link, MetaFunction, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@vercel/remix";
import { useEffect, useRef } from "react";

import { generateResetToken, validateEmail } from "~/utils/utils";
import emailjs from "@emailjs/nodejs";
import dotenv from "dotenv";

import { Heading } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

import { getUserByEmail } from "~/models/user.server";

export const meta: MetaFunction = () => [
  { title: "Reset Password | RSS Feed" },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!validateEmail(email)) {
    return json(
      { errors: "Email is invalid", success: "fail" },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser)
    return json(
      { errors: "This user wasn't registered.", success: "fail" },
      { status: 400 }
    );

  dotenv.config();
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
    privateKey: process.env.EMAILJS_PRIVATE_KEY as string,
  });
  const service = process.env.EMAILJS_SERVICE_ID as string;
  const template = process.env.EMAILJS_TEMPLATE_ID as string;

  const resetToken = generateResetToken(email);
  const resetLink = `${request.url}/${resetToken}`;

  try {
    await emailjs.send(service, template, {
      user: email,
      link: resetLink,
      reply_to: "wlelaki777@gmail.com",
    });

    return json({ errors: null, success: "ok" }, { status: 200 });
  } catch (err) {
    return json({ errors: null, success: "fail" }, { status: 400 });
  }
};

export default function ResetPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.errors) {
      emailRef.current?.focus();
    }
    if (actionData?.success === "ok") {
      toast("Email was sent successfully");
    }
  }, [actionData]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[400px] mx-auto min-w-[350px] h-full flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full m-[16px] flex flex-col gap-[40px] items-start box-border">
          <Heading>Forgot password?</Heading>
          <div>
            Enter the email associated with your account and we’ll send you a
            link to reset your password.
          </div>

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
                aria-invalid={actionData?.errors ? true : undefined}
                required
                placeholder="richard@piedpiper.com"
                className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
              />
              {actionData?.errors && (
                <div className="pt-1 text-red-700 animate-fade-in">
                  {actionData.errors}
                </div>
              )}
            </div>

            <div className="w-full flex justify-start">
              <Button
                className="w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Form>

          <div className="text-[#7b7b7b] text-[16px] leading-[150%] font-normal">
            Or{" "}
            <Link
              className="underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal"
              to={{ pathname: "/register" }}
            >
              Sign up
            </Link>{" "}
            if you don't have an account.
          </div>
        </div>
      </div>
    </div>
  );
}
