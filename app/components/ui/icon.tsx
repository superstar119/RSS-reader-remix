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
  drag: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_122_417)">
        <path
          d="M1.8125 14.5C2.26123 14.5 2.625 14.1362 2.625 13.6875C2.625 13.2388 2.26123 12.875 1.8125 12.875C1.36377 12.875 1 13.2388 1 13.6875C1 14.1362 1.36377 14.5 1.8125 14.5Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
        <path
          d="M1.8125 8.8125C2.26123 8.8125 2.625 8.44873 2.625 8C2.625 7.55127 2.26123 7.1875 1.8125 7.1875C1.36377 7.1875 1 7.55127 1 8C1 8.44873 1.36377 8.8125 1.8125 8.8125Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
        <path
          d="M1.8125 3.125C2.26123 3.125 2.625 2.76123 2.625 2.3125C2.625 1.86377 2.26123 1.5 1.8125 1.5C1.36377 1.5 1 1.86377 1 2.3125C1 2.76123 1.36377 3.125 1.8125 3.125Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
        <path
          d="M7.8125 14.5C8.26123 14.5 8.625 14.1362 8.625 13.6875C8.625 13.2388 8.26123 12.875 7.8125 12.875C7.36377 12.875 7 13.2388 7 13.6875C7 14.1362 7.36377 14.5 7.8125 14.5Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
        <path
          d="M7.8125 8.8125C8.26123 8.8125 8.625 8.44873 8.625 8C8.625 7.55127 8.26123 7.1875 7.8125 7.1875C7.36377 7.1875 7 7.55127 7 8C7 8.44873 7.36377 8.8125 7.8125 8.8125Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
        <path
          d="M7.8125 3.125C8.26123 3.125 8.625 2.76123 8.625 2.3125C8.625 1.86377 8.26123 1.5 7.8125 1.5C7.36377 1.5 7 1.86377 7 2.3125C7 2.76123 7.36377 3.125 7.8125 3.125Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_122_417">
          <rect width="10" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  trash: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M21.9375 6.5C21.9375 7.84619 17.936 8.9375 13 8.9375C8.06395 8.9375 4.0625 7.84619 4.0625 6.5M21.9375 6.5C21.9375 5.15381 17.936 4.0625 13 4.0625C8.06395 4.0625 4.0625 5.15381 4.0625 6.5M21.9375 6.5L19.5 21.125C19.5 21.125 18.6875 22.75 13 22.75C7.3125 22.75 6.5 21.125 6.5 21.125L4.0625 6.5M15.0312 13.4062L10.9688 17.4688M10.9688 13.4062L15.0312 17.4688"
        stroke={color ?? "#C0C0C0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  add: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M13 20.3125L13 5.6875M5.6875 13L20.3125 13"
        stroke={color ?? "#272727"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
