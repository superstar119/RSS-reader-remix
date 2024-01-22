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
    <div className="flex flex-col gap-[22px] w-[220px] max-w-[220px] opacity-0 hover:opacity-100 transition-opacity transition-duration-500">
      {items.map((item, index) => (
        <div className="flex gap-[5px] items-baseline" key={index}>
          <Text className="text-[#000]">{item.item}</Text>
          <sup>
            <Text className="text-[#c0c0c0] text-[14px]">{item.unread}</Text>
          </sup>
        </div>
      ))}
    </div>
  );
};
