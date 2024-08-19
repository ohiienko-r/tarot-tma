import { FC, useState } from "react";
import { haptic } from "@/Telegram";
import { Icons } from "@/Components";
import { BuyButtonPropTypes } from "./types";
import "./styles.scss";

const BuyButton: FC<BuyButtonPropTypes> = ({
  title,
  caption,
  onPress,
  disabled,
  className,
}) => {
  const [loadervisible, setLoadervisible] = useState(false);

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
      <div className="buy-button__text-container">
        <p>{title}</p>
        {caption && (
          <p className="buy-button__text-container--caption">{caption}</p>
        )}
      </div>
      {loadervisible ? <Icons.Loader /> : <Icons.Chevron stroke="#FFFFFF" />}
    </button>
  );
};

export default BuyButton;
