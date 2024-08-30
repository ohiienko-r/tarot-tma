import { FC } from "react";
import { ChevronPropTypes } from "./types";

const Chevron: FC<ChevronPropTypes> = ({ stroke, width, height }) => {
  return (
    <svg
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke={stroke ?? "var(--tg-theme-link-color)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
