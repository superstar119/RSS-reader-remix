import { FC, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type ShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const Shortcut: FC<ShortcutProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "w-[40px] h-[40px] flex justify-center items-center rounded-[4px] border-[#272727] border border-opacity-30 bg-opacity-30 bg-[#f1f1f1]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
