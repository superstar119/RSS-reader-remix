import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Heading, Text } from "~/components/ui/text";

export default function FeedsIndexPage() {
  return (
    <div className="w-[380px] flex flex-col mx-auto justify-center items-start gap-[24px] flex-grow">
      <div className="flex flex-col justify-center items-stretch gap-[8px]">
        <Heading className="w-full">Add the first feed</Heading>
        <Text className="w-full">
          Subscribe to any feed by simply pasting in the URL (it’s often the
          website URL ending in /feed/).
        </Text>
      </div>
      <Link to="/settings">
        <Button className="w-[120px] text-[Inter] text-[16px] leading-[150%] text-white px-[15px] py-[10px] rounded-[3px]">
          Add first feed
        </Button>
      </Link>
    </div>
  );
}
