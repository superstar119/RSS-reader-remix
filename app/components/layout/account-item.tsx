import { FC, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../ui/icon";

type AccountItemProps = HTMLAttributes<HTMLDivElement>;

export const AccountItem: FC<AccountItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("flex gap-[8px]", className)} {...props}>
      <Icon iconName="done" color="#c0c0c0" />
      {children}
    </div>
  );
};
