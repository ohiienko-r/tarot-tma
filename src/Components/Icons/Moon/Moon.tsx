import { FC } from "react";

type MoonPropTypes = {
  size?: number;
};

const Moon: FC<MoonPropTypes> = ({ size }) => {
  return (
    <svg
      height={`${size ?? 20}px`}
      width={`${size ?? 20}px`}
      version="1.1"
      id="Layer_1"
      viewBox="0 0 382.44 382.44"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#F7CF52"
          d="M381.445,192.22c0,105.06-85.17,190.22-190.22,190.22c-2.66,0-5.32-0.05-7.95-0.17 c-101.37-4.16-182.28-87.65-182.28-190.05c0-102.39,80.9-185.88,182.27-190.05c2.64-0.12,5.29-0.17,7.96-0.17 C296.275,2,381.445,87.16,381.445,192.22z"
        ></path>
        <path
          fill="#E2BC50"
          d="M191.215,0c-5.8,0-11.54,0.26-17.2,0.77c96.95,8.74,172.93,90.22,172.93,189.45 c0,99.25-76.01,180.74-172.99,189.45c5.68,0.51,11.44,0.77,17.26,0.77c105.06,0,190.23-85.16,190.23-190.22S296.275,0,191.215,0z"
        ></path>
      </g>
    </svg>
  );
};

export default Moon;
