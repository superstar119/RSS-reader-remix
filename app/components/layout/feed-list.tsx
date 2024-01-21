import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FeedItem } from "./feed-item";
import { Feed } from "@prisma/client";

type FeedListProps = {
  items: Array<Feed>;
};

export const FeedList: FC<FeedListProps> = ({ items }) => (
  <Droppable droppableId="feeds">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="flex flex-col gap-[12px]"
      >
        {items.map((item, index) => (
          <FeedItem key={item.id} feed={item} index={index} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);
