import { FC, useState } from "react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { ChevronIcon, LoaderIcon } from "@/Components";
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
      {loadervisible ? <LoaderIcon /> : <ChevronIcon stroke="#FFFFFF" />}
    </button>
  );
};

export default BuyButton;
