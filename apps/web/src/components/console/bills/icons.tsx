import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps, size = 14) {
  return {
    width: size,
    height: size,
    "aria-hidden": true as const,
    ...props,
  };
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...base(props, 12)}>
      <path d="M884 256h-75c-5.1 0-9.9 2.2-13.1 6.1L512 654.1 228.1 262.1c-3.2-3.9-8-6.1-13.1-6.1H140c-6.5 0-10.3 7.4-6.5 12.7l364.4 450.7c5.4 6.7 15.6 6.7 21 0l364.4-450.7c3.9-5.3.1-12.7-6.3-12.7z" />
    </svg>
  );
}

/** Ant Design RightOutlined — cascader expand */
export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...base(props, 12)}>
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...base(props, 14)}>
      <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z" />
    </svg>
  );
}

/** Ant Design SwapRightOutlined */
export function SwapRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" focusable="false" {...base(props, 14)}>
      <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z" />
    </svg>
  );
}

/** Ant Design ExportOutlined */
export function ExportIcon(props: IconProps) {
  return (
    <svg viewBox="64 64 896 896" fill="currentColor" {...base(props, 14)}>
      <path d="M888.3 757.4h-53.8c-4.2 0-7.7 3.5-7.7 7.7v61.8H197.1V197.1h629.5v61.8c0 4.2 3.5 7.7 7.7 7.7h53.8c4.2 0 7.7-3.4 7.7-7.7V158.7c0-25.6-19.2-46.1-42.9-46.1H158.7c-25.6 0-46.1 19.2-46.1 42.9v708.6c0 25.6 19.2 46.1 42.9 46.1h708.6c25.6 0 46.1-19.2 46.1-42.9V765c0-4.2-3.5-7.6-7.7-7.6zm18.6-312.1l112-112c4.1-4.1 4.1-10.8 0-14.9l-112-112c-6.1-6.1-16.5-1.8-16.5 6.7V416H472c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h418.4V604c0 8.5 10.4 12.8 16.5 6.7z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="64 64 896 896" fill="currentColor" {...base(props, 14)}>
      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.05a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.08a.12.12 0 010-.06c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.01.09.05L512 454.07l287.7-287.7c.04-.04.06-.05.09-.05a.12.12 0 01.07 0z" />
    </svg>
  );
}

export function InfoCircleIcon(props: IconProps) {
  return (
    <svg viewBox="64 64 896 896" fill="currentColor" {...base(props, 14)}>
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="64 64 896 896" fill="currentColor" {...base(props, 16)}>
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
    </svg>
  );
}

/** Ant Design Empty simple illustration */
export function EmptySimpleIcon(props: IconProps) {
  return (
    <svg
      width={64}
      height={41}
      viewBox="0 0 64 41"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>暂无数据</title>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="#f8fafc" cx="32" cy="33" rx="32" ry="7" />
        <g fillRule="nonzero" stroke="#e2e8f0">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35H11.95C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            fill="#f8fafc"
          />
        </g>
      </g>
    </svg>
  );
}
