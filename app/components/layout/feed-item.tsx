import {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
  Component,
} from "react";
import { Draggable } from "react-beautiful-dnd";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "~/lib/utils";
import { Feed } from "@prisma/client";
import { FormProps, SubmitOptions, useFetcher } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Fetcher {
  // functions to initiate requests
  load: (href: string) => void;
  submit: (
    data: FormData | URLSearchParams | Record<string, string>,
    options?: SubmitOptions
  ) => void;

  // State about the current request
  data: any; // The response from the loader or action
  Form: React.ComponentType<FormProps>; // A special form component tied to this fetcher instance
  state: "idle" | "submitting" | "loading" | "error";
  type: "init" | "done" | "actionSubmission" | "loaderSubmission";

  // Any error that was thrown during request
  error: any;
}

interface TemplateProps<T, DragHandleProps> {
  item: T;
  dragHandleProps: DragHandleProps;
  commonProps: {
    fetcher: Fetcher;
  };
}

// Define your specific drag handle properties once you know what they are.
interface SpecificDragHandleProps {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
}

// Extend the React HTML Div props if you expect other HTML attributes
interface FeedItemProps
  extends TemplateProps<Feed, SpecificDragHandleProps>,
    HTMLAttributes<HTMLDivElement> {}

export class FeedItem extends Component<FeedItemProps> {
  state = {
    hover: false,
  };

  setHover = (hover: boolean) => {
    this.setState({ hover });
  };

  render() {
    const { item, dragHandleProps, commonProps } = this.props;
    const { fetcher } = commonProps;
    const { onMouseDown, onTouchStart } = dragHandleProps;

    return (
      <div className="flex flex-col" aria-label="Change feed order">
        <div
          className={cn("flex items-center justify-between")}
          onMouseOver={() => this.setHover(true)}
          onMouseOut={() => this.setHover(false)}
        >
          <div className=" gap-[12px] flex items-center">
            <div
              className={this.state.hover ? "opacity-100" : "opacity-0"}
              onTouchStart={(e) => {
                e.preventDefault();
                onTouchStart(e);
              }}
              onMouseDown={(e) => {
                onMouseDown(e);
              }}
            >
              <Icon
                iconName="drag"
                color="#c0c0c0"
                className={cn("animate-fade-in transition-all")}
              />
            </div>
            <Text>{item.url}</Text>
          </div>
          <fetcher.Form method="delete" action="/settings" className="z-40">
            <Input type="hidden" name="id" defaultValue={item.id} />
            <button
              className="!bg-transparent h-content p-0"
              value="deleteFeed"
              name="_action"
              type="submit"
            >
              <Icon
                iconName={fetcher.state === "idle" ? "trash" : "loading"}
                color="#c0c0c0"
                className={cn(
                  "animate-fade-in transition-all",
                  fetcher.state !== "idle"
                    ? "opacity-100"
                    : this.state.hover
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </button>
          </fetcher.Form>
        </div>
        <Separator className="h-[1px] bg-[#f1f1f1] mt-[12px] pl-[22px] dark:bg-slate-800" />
      </div>
    );
  }
}
