import { HTMLAttributes, FC } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../ui/icon";

type NavbarProps = HTMLAttributes<HTMLDivElement> & {
  isLogged: boolean;
};

const Navbar: FC<NavbarProps> = ({ className, isLogged, ...props }) => {
  return (
    <div
      className={cn(
        "w-full h-[96px] py-[22px] flex  items-center absolute top-0 left-0",
        isLogged ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    >
      <Icon iconName="logo" color="#C0C0C0" />
    </div>
  );
};

export default Navbar;
