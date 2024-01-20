import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FeedItem } from "./feed-item";

type FeedListProps = {
  items: Array<{
    id: string;
    content: string;
  }>;
};

export const FeedList: FC<FeedListProps> = ({ items }) => (
  <Droppable droppableId="feed-list">
    {(provided) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="flex flex-col gap-[12px]"
      >
        {items.map((item, index) => (
          <FeedItem key={item.id} item={item} index={index} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);
