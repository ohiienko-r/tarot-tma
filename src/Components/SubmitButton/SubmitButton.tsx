import { FC } from "react";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { SubmitButtonPropTypes } from "./types";
import "./styles.scss";

const Submitbutton: FC<SubmitButtonPropTypes> = ({
  title,
  onPress,
  disabled,
}) => {
  const handlePress = () => {
    hapticFeedback.impactOccurred("medium");
    onPress();
  };

  return (
    <button onClick={handlePress} className="submit-button" disabled={disabled}>
      {title}
    </button>
  );
};

export default Submitbutton;
