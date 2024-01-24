import { HTMLAttributes, FC } from "react";
import { cn } from "~/lib/utils";

type TextProps = HTMLAttributes<HTMLSpanElement>;

export const Heading: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "text-[30px] text-black dark:text-white font-medium leading-[145%]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const Category: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "text-[22px] leading-[145%] font-normal select-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const Key: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "text-[18px] text-[#7b7b7b] leading-[150%] font-normal",
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
        "text-[16px] text-[#272727] dark:text-[#fff] leading-[150%] font-normal",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
