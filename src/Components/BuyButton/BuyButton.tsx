import { FC, useState, ReactNode } from "react";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { Icons } from "@/Components";
import { SubmitButtonPropTypes } from "../SubmitButton/SubmitButton";
import "./styles.scss";

type BuyButtonPropTypes = SubmitButtonPropTypes & {
  price?: number;
  className?: string;
  children?: ReactNode;
};

const BuyButton: FC<BuyButtonPropTypes> = ({
  title,
  price,
  onPress,
  disabled,
  className,
  children,
}) => {
  const [loadervisible, setLoadervisible] = useState(false);

  const handleClick = async () => {
    hapticFeedback.impactOccurred("medium");
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
          <p>{title}</p>
          {children}
        </p>
      </div>
      {loadervisible && <Icons.Loader />}
      {!loadervisible && price && (
        <div className="buy-button__price">
          {price} <Icons.TelegramStar />
        </div>
      )}
    </button>
  );
};

export default BuyButton;
