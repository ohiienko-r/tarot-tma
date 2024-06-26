import { useEffect } from "react";
import { useBalance } from "@/Contexts";
import { useMainButton, useHapticFeedback } from "@tma.js/sdk-react";
import { UseSpreadButton } from "./types";

const useSpreadButton = ({
  color,
  title,
  disabled,
  spreadCost,
  onClick,
}: UseSpreadButton) => {
  const { balance } = useBalance();
  const haptic = useHapticFeedback();
  const mainButton = useMainButton();

  mainButton.setText(title);

  const handleClick = () => {
    haptic.impactOccurred("medium");
    onClick();
  };

  useEffect(() => {
    mainButton.on("click", handleClick);
    mainButton.show();
    return () => {
      mainButton.off("click", handleClick);
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    if ((balance && spreadCost && balance < spreadCost) || disabled) {
      mainButton.setBgColor("#808080");
      mainButton.disable();
    } else {
      mainButton.setBgColor(color);
      mainButton.enable();
    }
  }, [spreadCost, balance]);
};

export default useSpreadButton;
