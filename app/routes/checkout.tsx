import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/text";

export default function Checkout() {
  return (
    <div className="w-[560px] mx-auto flex flex-col justify-start items-center py-[180px] gap-[40px] animate-fade-in">
      <Heading className="w-full text-center">No active subscription</Heading>
      <Button className="text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px] inline-flex items-center gap-[10px] w-auto">
        Select Plan
      </Button>
      <span className="text-[#7b7b7b]">
        Or{" "}
        <Link
          className="underline p-0 text-[#7b7b7b] text-[16px] leading-[150%] font-normal"
          to={{ pathname: "/login" }}
        >
          log out
        </Link>
        .
      </span>
    </div>
  );
}
