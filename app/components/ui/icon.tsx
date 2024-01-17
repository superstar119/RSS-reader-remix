import { type LucideProps } from "lucide-react";
import { cn } from "~/lib/utils";
import { forwardRef, type FC, type HTMLAttributes } from "react";

type TSvgProps = LucideProps & {
  color?: string;
};

export type TIcon = keyof typeof ICONS;

export type IconProps = {
  color?: string;
  iconName: TIcon;
  adapt?: boolean;
  rotate?: number;
  iconClassName?: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "onClick" | "style">;

export const ICONS = {
  logo: ({ className, color }) => (
    <svg
      width="34"
      height="8"
      viewBox="0 0 34 8"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={color ?? "black"} />
      <circle cx="17" cy="4" r="4" fill={color ?? "black"} />
      <circle cx="30" cy="4" r="4" fill={color ?? "black"} />
    </svg>
  ),
} as const satisfies Record<string, FC<TSvgProps>>;

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      iconName,
      color = "black",
      adapt = true,
      rotate = 0,
      className,
      iconClassName,
      onClick,
      style = {},
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          `flex flex-row items-center justify-center ${
            onClick ? "cursor-pointer" : ""
          }`,
          className
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
        {...props}
        ref={ref}
      >
        {!!ICONS[iconName] &&
          ICONS[iconName]({
            color: color,
            className: cn("overflow-visible", iconClassName),
          })}
      </div>
    );
  }
);

Icon.displayName = "Icon";
