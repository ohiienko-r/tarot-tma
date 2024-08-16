import { FC } from "react";
import { haptic } from "@/Telegram";
import { SubmitButtonPropTypes } from "./types";
import "./styles.scss";

const Submitbutton: FC<SubmitButtonPropTypes> = ({
  title,
  onPress,
  disabled,
}) => {
  const handlePress = () => {
    haptic.impactOccurred("medium");
    onPress();
  };

  return (
    <button onClick={handlePress} className="submit-button" disabled={disabled}>
      {title}
    </button>
  );
};

export default Submitbutton;
