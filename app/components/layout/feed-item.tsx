import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "~/lib/utils";

type FeedItemProps = {
  item: {
    id: string;
    content: string;
  };
  index: number;
};

export const FeedItem: FC<FeedItemProps> = ({ item, index }) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col"
          style={{ ...provided.draggableProps.style }}
        >
          <div
            className={cn(
              "flex items-center justify-between",
              snapshot.isDragging ? "shadow" : ""
            )}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            <div className=" gap-[12px] flex items-center">
              <Icon
                iconName="drag"
                color="#c0c0c0"
                className={cn(
                  "animate-fade-in transition-all",
                  hover ? "opacity-100" : "opacity-0"
                )}
              />

              <Text>{item.content}</Text>
            </div>
            <Icon
              iconName="trash"
              color="#c0c0c0"
              className={cn(
                "animate-fade-in transition-all",
                hover ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
          <Separator className="h-[1px] bg-[#f1f1f1] mt-[12px] pl-[22px]" />
        </div>
      )}
    </Draggable>
  );
};
