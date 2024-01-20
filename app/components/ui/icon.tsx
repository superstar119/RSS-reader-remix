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
  done: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M2.30762 10.4081L7.2728 15.3732L18.0307 4.61536"
        stroke={color ?? "#C0C0C0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  link: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M17.875 2.4375H23.5625V8.125M22.3438 3.65625L16.25 9.75M13.8125 4.0625H6.5C5.15381 4.0625 4.0625 5.15381 4.0625 6.5V19.5C4.0625 20.8462 5.15381 21.9375 6.5 21.9375H19.5C20.8462 21.9375 21.9375 20.8462 21.9375 19.5V12.1875"
        stroke={color ?? "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  return: ({ className, color }) => (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.7057 12.0696L0.908825 8.27273L4.7057 4.47585V12.0696ZM3.54235 8.96307V7.58239H15.0352V8.96307H3.54235ZM13.6929 8.96307V0.909091H15.0736V8.96307H13.6929ZM9.97275 2.28977V0.909091H15.0352V2.28977H9.97275Z"
        fill={color ?? "#7B7B7B"}
      />
    </svg>
  ),
  arrowLeft: ({ className, color }) => (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.91735 12L0.190075 6.27273L5.91735 0.545455L6.90172 1.51705L2.84917 5.5696H13.3449V6.97585H2.84917L6.90172 11.0156L5.91735 12Z"
        fill={color ?? "#7B7B7B"}
      />
    </svg>
  ),
  arrowRight: ({ className, color }) => (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.09064 12L7.10627 11.0284L11.1588 6.97585H0.663086V5.5696H11.1588L7.10627 1.52983L8.09064 0.545455L13.8179 6.27273L8.09064 12Z"
        fill={color ?? "#7B7B7B"}
      />
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
