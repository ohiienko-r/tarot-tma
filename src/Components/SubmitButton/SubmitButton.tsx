import { FC } from "react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { SubmitButtonPropTypes } from "./types";
import "./styles.scss";

const Submitbutton: FC<SubmitButtonPropTypes> = ({
  title,
  onPress,
  disabled,
}) => {
  const haptic = useHapticFeedback();

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
