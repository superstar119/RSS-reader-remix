import { HTMLAttributes, FC } from "react";
import { cn } from "~/lib/utils";

type TextProps = HTMLAttributes<HTMLSpanElement>;

export const Heading: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "text-[30px] text-black font-medium leading-[145%]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const Text: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "text-[16px] text-[#272727] leading-[150%] font-normal",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
