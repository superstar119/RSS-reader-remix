import { type LucideProps } from "lucide-react";
import { cn } from "~/lib/utils";
import { forwardRef, type FC, type HTMLAttributes } from "react";
import "~/assets/style.css";

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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.875 1.11353H20.5625V6.80103M19.3438 2.33228L13.25 8.42603M10.8125 2.73853H3.5C2.15381 2.73853 1.0625 3.82983 1.0625 5.17603V18.176C1.0625 19.5222 2.15381 20.6135 3.5 20.6135H16.5C17.8462 20.6135 18.9375 19.5222 18.9375 18.176V10.8635"
        stroke={color ?? "#C0C0C0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  linkBill: ({ className, color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={`${className}`}
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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
      className={`${className} hover-icon`}
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
  close: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M1 17.676L17 1.67603M17 17.676L1 1.67603"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  reload: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M7.45857 6.02986C11.1291 2.96941 16.5856 3.46397 19.6461 7.13449C22.7065 10.805 22.212 16.2615 18.5414 19.322C14.8709 22.3824 9.41438 21.8879 6.35393 18.2174C4.35706 15.8224 3.87365 12.6672 4.7984 9.91321"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.71918 2.89089L6.72019 6.64553L10.4135 7.3216"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  tiles: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className={`${className} hover-icon`}
      >
        <mask id="path-1-inside-1_1174_429" fill="white">
          <rect
            x="0.4375"
            y="0.113525"
            width="9.24219"
            height="9.38889"
            rx="1"
          />
        </mask>
        <rect
          x="0.4375"
          y="0.113525"
          width="9.24219"
          height="9.38889"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-1-inside-1_1174_429)"
        />
        <mask id="path-2-inside-2_1174_429" fill="white">
          <rect
            x="0.4375"
            y="11.8496"
            width="9.24219"
            height="9.38889"
            rx="1"
          />
        </mask>
        <rect
          x="0.4375"
          y="11.8496"
          width="9.24219"
          height="9.38889"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-2-inside-2_1174_429)"
        />
        <mask id="path-3-inside-3_1174_429" fill="white">
          <rect
            x="12.3203"
            y="0.113525"
            width="9.24219"
            height="9.38889"
            rx="1"
          />
        </mask>
        <rect
          x="12.3203"
          y="0.113525"
          width="9.24219"
          height="9.38889"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-3-inside-3_1174_429)"
        />
        <mask id="path-4-inside-4_1174_429" fill="white">
          <rect
            x="12.3203"
            y="11.8496"
            width="9.24219"
            height="9.38889"
            rx="1"
          />
        </mask>
        <rect
          x="12.3203"
          y="11.8496"
          width="9.24219"
          height="9.38889"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-4-inside-4_1174_429)"
        />
      </svg>
    );
  },
  imageList: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M8.13184 2H20.1318"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.13184 9.23669H20.1318"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.13184 16.2367H20.1318"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <mask id="path-4-inside-1_1174_447" fill="white">
          <rect y="14.2367" width="5" height="5" rx="1" />
        </mask>
        <rect
          y="14.2367"
          width="5"
          height="5"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-4-inside-1_1174_447)"
        />
        <mask id="path-5-inside-2_1174_447" fill="white">
          <rect x="0.131836" y="7.23669" width="5" height="5" rx="1" />
        </mask>
        <rect
          x="0.131836"
          y="7.23669"
          width="5"
          height="5"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-5-inside-2_1174_447)"
        />
        <mask id="path-6-inside-3_1174_447" fill="white">
          <rect x="0.131836" width="5" height="5" rx="1" />
        </mask>
        <rect
          x="0.131836"
          width="5"
          height="5"
          rx="1"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="4"
          mask="url(#path-6-inside-3_1174_447)"
        />
      </svg>
    );
  },

  list: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M1 1H21"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1 9H21"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1 16H21"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },

  dark: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M10.8016 4.73853C9.25995 5.15161 7.85418 5.96324 6.7256 7.09181C5.59703 8.22039 4.7854 9.62616 4.37232 11.1678C3.95923 12.7095 3.95923 14.3327 4.37232 15.8744C4.7854 17.4161 5.59703 18.8218 6.7256 19.9504C7.85418 21.079 9.25995 21.8906 10.8016 22.3037C12.3433 22.7168 13.9665 22.7168 15.5082 22.3037C17.0499 21.8906 18.4556 21.079 19.5842 19.9504C20.7128 18.8218 21.5244 17.4161 21.9375 15.8744C21.9375 15.8744 17.2878 17.654 13.1549 13.5211C9.022 9.38821 10.8016 4.73853 10.8016 4.73853Z"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  setting: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M11.2981 3.42125C11.3433 3.2404 11.5058 3.11353 11.6922 3.11353H14.3078C14.4942 3.11353 14.6567 3.2404 14.7019 3.42125L15.262 5.66168C15.2969 5.80105 15.403 5.9109 15.5395 5.95576C15.8501 6.05787 16.1524 6.17821 16.4453 6.31551C16.561 6.36979 16.6953 6.37038 16.8097 6.3132L19.0579 5.18911C19.2143 5.11091 19.4032 5.14156 19.5268 5.26521L21.4108 7.14921C21.5345 7.27286 21.5651 7.46175 21.4869 7.61815L20.3628 9.86634C20.3057 9.9807 20.3062 10.115 20.3605 10.2308C20.4639 10.4513 20.5577 10.6771 20.6413 10.9079C20.6848 11.028 20.7793 11.1233 20.9005 11.1637L23.2847 11.9584C23.4506 12.0137 23.5625 12.169 23.5625 12.3438V15.0082C23.5625 15.1831 23.4506 15.3383 23.2847 15.3936L20.9005 16.1884C20.7793 16.2288 20.6848 16.3241 20.6413 16.4442C20.5577 16.6749 20.4639 16.9008 20.3605 17.1213C20.3062 17.237 20.3056 17.3714 20.3628 17.4857L21.4869 19.7339C21.5651 19.8903 21.5345 20.0792 21.4108 20.2028L19.5268 22.0868C19.4032 22.2105 19.2143 22.2411 19.0579 22.1629L16.8097 21.0389C16.6953 20.9817 16.561 20.9823 16.4452 21.0365C16.2248 21.1399 15.9989 21.2337 15.7682 21.3173C15.648 21.3608 15.5527 21.4553 15.5123 21.5765L14.7176 23.9607C14.6623 24.1266 14.5071 24.2385 14.3322 24.2385H11.6678C11.4929 24.2385 11.3377 24.1266 11.2824 23.9607L10.4877 21.5765C10.4473 21.4553 10.352 21.3608 10.2318 21.3173C9.92458 21.206 9.62596 21.0766 9.33724 20.9306C9.209 20.8657 9.05622 20.8683 8.93298 20.9422L6.95223 22.1307C6.79238 22.2266 6.58777 22.2014 6.45595 22.0696L4.60643 20.2201C4.47462 20.0883 4.44943 19.8837 4.54534 19.7238L5.73379 17.7431C5.80773 17.6198 5.81035 17.467 5.74547 17.3388C5.56341 16.9789 5.40734 16.6037 5.27974 16.2155C5.23487 16.079 5.12502 15.9729 4.98566 15.9381L2.74522 15.378C2.56437 15.3327 2.4375 15.1703 2.4375 14.9838L2.4375 12.3682C2.4375 12.1818 2.56437 12.0193 2.74522 11.9741L4.98566 11.414C5.12502 11.3791 5.23487 11.273 5.27973 11.1366C5.40734 10.7484 5.56341 10.3731 5.74547 10.0133C5.81034 9.88502 5.80773 9.73225 5.73378 9.60901L4.54533 7.62825C4.44942 7.46841 4.47461 7.26379 4.60642 7.13198L6.45595 5.28246C6.58776 5.15064 6.79237 5.12545 6.95222 5.22136L8.93297 6.40981C9.05621 6.48376 9.20899 6.48637 9.33723 6.4215C9.6971 6.23944 10.0724 6.08337 10.4605 5.95576C10.597 5.9109 10.7031 5.80105 10.738 5.66168L11.2981 3.42125Z"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0625 13.676C17.0625 15.9197 15.2437 17.7385 13 17.7385C10.7563 17.7385 8.9375 15.9197 8.9375 13.676C8.9375 11.4324 10.7563 9.61353 13 9.61353C15.2437 9.61353 17.0625 11.4324 17.0625 13.676Z"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  checkmark: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M3 14.2065L9.45474 20.6613L23.44 6.67603"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  linkOut: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M17.875 3.11353H23.5625V8.80103M22.3438 4.33228L16.25 10.426M13.8125 4.73853H6.5C5.15381 4.73853 4.0625 5.82983 4.0625 7.17603V20.176C4.0625 21.5222 5.15381 22.6135 6.5 22.6135H19.5C20.8462 22.6135 21.9375 21.5222 21.9375 20.176V12.8635"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  linkCopy: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M11.6412 16.393L10.962 15.7138C8.92425 13.6761 8.92425 10.9591 10.962 8.92132L13.679 6.20433C15.7167 4.16659 18.4337 4.16659 20.4714 6.20433C22.5092 8.24207 22.5092 10.9591 20.4714 12.9968M14.3583 10.9591L15.0375 11.6383C17.0753 13.6761 17.0753 16.3931 15.0375 18.4308L12.3205 21.1478C10.2828 23.1855 7.5658 23.1855 5.52806 21.1478C3.49032 19.1101 3.49032 16.3931 5.52806 14.3553"
          stroke={color ?? "#C0C0C0"}
          className="transition-all transition-duration-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  light: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        className={`${className} hover-icon`}
      >
        <path
          d="M13 4.875V2.4375M7.25476 7.25476L5.53119 5.53119M4.875 13H2.4375M13 23.5625V21.125M20.4688 20.4688L18.7452 18.7452M23.5625 13H21.125M7.25476 18.7452L5.53119 20.4688M20.4688 5.5312L18.7453 7.25478M17.875 13C17.875 15.6924 15.6924 17.875 13 17.875C10.3076 17.875 8.125 15.6924 8.125 13C8.125 10.3076 10.3076 8.125 13 8.125C15.6924 8.125 17.875 10.3076 17.875 13Z"
          stroke={color ?? "#C0C0C0"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  loading: ({ className, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: "translate3d(0px, 0px, 0px)",
          animation: "spin 1s infinite linear",
          color: color,
        }}
        className={`${className} hover-icon`}
      >
        <defs>
          <clipPath id="__lottie_element_2">
            <rect width="50" height="50" x="0" y="0"></rect>
          </clipPath>
        </defs>
        <g clipPath="url(#__lottie_element_2)">
          <g
            transform="matrix(0.9961947202682495,-0.08715574443340302,0.08715574443340302,0.9961947202682495,-2.083761215209961,2.274026870727539)"
            opacity="1"
            style={{ display: "block" }}
          >
            <g opacity="1" transform="matrix(1,0,0,1,25,25)">
              <path
                strokeLinecap="round"
                strokeLinejoin="miter"
                fillOpacity="0"
                strokeMiterlimit="4"
                stroke={color}
                strokeOpacity="1"
                strokeWidth="4"
                d=" M13.222999572753906,-16.315000534057617 C9.61299991607666,-19.2450008392334 5.011000156402588,-21 0,-21 C0,-21 0,-21 0,-21 C-2.8380000591278076,-21 -5.544000148773193,-20.437000274658203 -8.013999938964844,-19.41699981689453"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    );
  },
  youtube: ({ className, color }) => {
    return (
      <svg
        width="68"
        height="48"
        viewBox="0 0 68 48"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
          fill="#f00"
        ></path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
      </svg>
    );
  },
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
      <span
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
      </span>
    );
  }
);

Icon.displayName = "Icon";
