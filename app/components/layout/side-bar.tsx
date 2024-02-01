import { FC } from "react";
import { Text } from "../ui/text";

export type SidebarType = {
  item: string | undefined;
  unread: number | undefined;
};
export type SidebarProps = {
  items: Array<SidebarType>;
};

export const Sidebar: FC<SidebarProps> = ({ items }) => {
  return (
    <div
      className="fixed top-[96px] left-[0px] flex flex-col items-center justify-start opacity-0 hover:opacity-100 transition-opacity transition-duration-500 px-4 gap-[22px] w-[250px] max-w-[250px] py-[50px]"
      style={{ height: "calc(100% - 96px)" }}
    >
      {items.map((item, index) => (
        <div
          className="flex gap-[15px] items-baseline justify-between w-full"
          key={index}
        >
          <Text className="truncate">{item.item}</Text>
          <sup>
            <Text className="text-[#c0c0c0] trancate text-[14px] dark:opacity-40">
              {item.unread}
            </Text>
          </sup>
        </div>
      ))}
    </div>
  );
};
