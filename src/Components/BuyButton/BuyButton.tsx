import { FC, useState, ReactNode } from "react";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { Icons } from "@/Components";
import { SubmitButtonPropTypes } from "../SubmitButton/SubmitButton";
import "./styles.scss";

type BuyButtonPropTypes = SubmitButtonPropTypes & {
  caption?: string;
  price?: number;
  className?: string;
  children?: ReactNode;
};

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
      {caption && <p className="buy-button__text--caption">{caption}</p>}
    </button>
  );
};

export default BuyButton;
