import { FC, useContext, useEffect, useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import layoutContext from "~/lib/context";

export type SidebarType = {
  item: string | undefined;
  unread: number | undefined;
  feedId: string;
};
export type SidebarProps = {
  items: Array<SidebarType>;
};

export const Sidebar: FC<SidebarProps> = ({ items }) => {
  const { context, setContext } = useContext(layoutContext);
  const [selected, setSelect] = useState<string>("all");

  useEffect(() => {
    setContext({ ...context, category: selected });
  }, [selected]);

  return (
    <div
      className="fixed top-[96px] left-[0px] flex flex-col items-center justify-start opacity-0 hover:opacity-100 transition-opacity transition-duration-500 px-4 w-[250px] max-w-[250px] py-[50px]"
      style={{ height: "calc(100% - 96px)" }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelect(item.feedId)}
          className="w-full"
        >
          <Button
            className="flex gap-[15px] items-baseline justify-between w-full hover:bg-gray-100 rounded-[8px] dark:hover:bg-gray-800 p-[11px]"
            variant="ghost"
          >
            <Text className="truncate capitalize">{item.item}</Text>
            <sup>
              <Text className="text-[#c0c0c0] trancate text-[14px] dark:opacity-40">
                {item.unread}
              </Text>
            </sup>
          </Button>
        </div>
      ))}
    </div>
  );
};
