import { FC, useState } from "react";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { BuyButtonPropTypes } from "./types";
import "./styles.scss";

const BuyButton: FC<BuyButtonPropTypes> = ({
  title,
  onPress,
  disabled,
  className,
}) => {
  const [loadervisible, setLoadervisible] = useState(false);
  const haptic = useHapticFeedback();

  const handleClick = async () => {
    haptic.impactOccurred("medium");
    setLoadervisible(true);
    await onPress();
    setLoadervisible(false);
  };

  return (
    <button
      className={["buy-button", className && className].join(" ")}
      onClick={handleClick}
      disabled={disabled}
    >
      <p>{title}</p>
      {loadervisible ? (
        <svg
          className="buy-button__loader"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.5"
            x="11.0005"
            y="14.9999"
            width="2"
            height="7"
            rx="1"
            fill="#707579"
          />
          <rect
            opacity="0.25"
            x="13.4146"
            y="14.8284"
            width="2"
            height="7"
            rx="1"
            transform="rotate(-45 13.4146 14.8284)"
            fill="#707579"
          />
          <rect
            x="2.00049"
            y="12.9999"
            width="2"
            height="7"
            rx="1"
            transform="rotate(-90 2.00049 12.9999)"
            fill="#707579"
          />
          <rect
            opacity="0.75"
            x="5.63672"
            y="19.7781"
            width="2"
            height="7"
            rx="1"
            transform="rotate(-135 5.63672 19.7781)"
            fill="#707579"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3L11 8L6 13"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default BuyButton;
