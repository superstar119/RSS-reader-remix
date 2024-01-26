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
      className="fixed top-[96px] left-[0px] overflow-y-scroll flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity transition-duration-500 px-4 gap-[22px] w-[220px] max-w-[220px]"
      style={{ height: "calc(100% - 96px)" }}
    >
      {items.map((item, index) => (
        <div className="flex gap-[5px] items-baseline w-full" key={index}>
          <Text className="">{item.item}</Text>
          <sup>
            <Text className="text-[#c0c0c0] text-[14px] dark:opacity-40">
              {item.unread}
            </Text>
          </sup>
        </div>
      ))}
    </div>
  );
};
