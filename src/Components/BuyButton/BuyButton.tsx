import { FC, useState } from "react";
import { haptic } from "@/Telegram";
import { Icons } from "@/Components";
import { BuyButtonPropTypes } from "./types";
import "./styles.scss";

const BuyButton: FC<BuyButtonPropTypes> = ({
  title,
  caption,
  price,
  onPress,
  disabled,
  className,
  children,
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
      className={["buy-button", className].join(" ")}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="buy-button__text">
        <p className="buy-button__text--title">
          {title}
          {children}
        </p>
        {caption && <p className="buy-button__text--caption">{caption}</p>}
      </div>
      {loadervisible ? (
        <Icons.Loader />
      ) : price ? (
        <p className="buy-button__price">
          <Icons.TelegramStar />
          {price}
        </p>
      ) : (
        <Icons.Chevron stroke="#FFFFFF" />
      )}
    </button>
  );
};

export default BuyButton;
