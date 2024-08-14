import { FC, useState } from "react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { ChevronIcon, LoaderIcon } from "@/Components";
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
      <div className="buy-button__text-container">
        <p>{title}</p>
        {caption && (
          <p className="buy-button__text-container--caption">{caption}</p>
        )}
      </div>
      {loadervisible ? <LoaderIcon /> : <ChevronIcon stroke="#FFFFFF" />}
    </button>
  );
};

export default BuyButton;
