import { FC, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type ShortcutItemProps = HTMLAttributes<HTMLDivElement>;

export const ShortcutItem: FC<ShortcutItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-center py-[12px] gap-[24px]", className)}
      {...props}
    >
      {children}
    </div>
  );
};
