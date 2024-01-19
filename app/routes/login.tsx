import { Heading } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Login" }];

function Login() {
  return (
    <div className="max-w-[400px] mx-auto mt-[90px] mx-auto min-w-[350px] box-border">
      <div className="w-full m-[16px] flex flex-col gap-[40px] items-start box-border">
        <Heading>Login</Heading>
        <div className="w-full flex flex-col gap-[16px] items-start">
          <div className="w-full flex flex-col gap-[8px] items-start">
            <Label htmlFor="email" className="text-[16px] leading-[150%]">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="richard@piedpiper.com"
              className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
            />
          </div>

          <div className="w-full flex flex-col gap-[8px] items-start">
            <Label htmlFor="password" className="text-[16px] leading-[150%]">
              Password
            </Label>
            <Input
              type="password"
              placeholder="•••••••••••"
              className="rounded-[3px] px-[20px] py-[16px] text-[16px] leading-[150%] h-[56px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#f1f1f1] focus:border-black placeholder:text-[#c0c0c0]"
            />
          </div>

          <div className="w-full flex justify-between">
            <Button className="w-[150px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]">
              Login
            </Button>
            <Button
              variant={"link"}
              className="text-[#7b7b7b] underline p-0 font-normal"
            >
              Forgot password?
            </Button>
          </div>
        </div>

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
  );
}

export default Login;
