import { FC } from "react";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { SubmitButtonPropTypes } from "./types";

const Submitbutton: FC<SubmitButtonPropTypes> = ({ title, onPress }) => {
  const haptic = useHapticFeedback();

  const handlePress = () => {
    haptic.impactOccurred("medium");
    onPress();
  };

  return (
    <button onClick={handlePress} className="submit-button">
      {title}
    </button>
  );
};

export default Submitbutton;
