import { FC } from "react";

type ChevronPropTypes = {
  stroke?: string;
  width?: string;
  height?: string;
  direction?: "left" | "right";
};

const Chevron: FC<ChevronPropTypes> = ({
  stroke,
  width,
  height,
  direction = "right",
}) => {
  return (
    <svg
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: direction === "left" ? "180deg" : "0" }}
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
