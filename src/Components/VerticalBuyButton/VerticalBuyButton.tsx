import { FC, useState } from "react";
import { Icons } from "..";
import { haptic } from "@/Telegram";
import { SubmitButtonPropTypes } from "../SubmitButton/types";
import "./styles.scss";

type VerticalBuyButtonPropTypes = SubmitButtonPropTypes & {
  caption?: string;
  price: number;
};

const VerticalBuyButton: FC<VerticalBuyButtonPropTypes> = ({
  title,
  caption,
  price,
  onPress,
}) => {
  const [loadervisible, setLoadervisible] = useState(false);

  const handleClick = async () => {
    haptic.impactOccurred("medium");
    setLoadervisible(true);
    await onPress();
    setLoadervisible(false);
  };
  return (
    <button onClick={handleClick} className="vb-button">
      {loadervisible ? (
        <Icons.Loader />
      ) : (
        <>
          <p className="vb-button__title">{title}</p>
          <div className="vb-button__footer">
            <p
              className="vb-button__price"
              style={!caption ? { marginBottom: "12px" } : {}}
            >
              <Icons.TelegramStar />
              {price}
            </p>
            <del
              className="vb-button__caption"
              style={!caption ? { visibility: "hidden" } : {}}
            >
              {caption}
            </del>
          </div>
        </>
      )}
    </button>
  );
};

export default VerticalBuyButton;
