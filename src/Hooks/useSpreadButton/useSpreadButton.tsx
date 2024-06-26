import { useEffect } from "react";
import { useBalance } from "@/Contexts";
import { useMainButton } from "@tma.js/sdk-react";
import { UseSpreadButton } from "./types";
import { useHapticFeedback } from "@tma.js/sdk-react";

const useSpreadButton = ({
  color,
  title,
  spreadCost,
  onClick,
}: UseSpreadButton) => {
  const { balance } = useBalance();
  const mainButton = useMainButton();
  const haptic = useHapticFeedback();
  mainButton.setText(title);

  const handleClick = async () => {
    haptic.impactOccurred("medium");
    mainButton.hide();
    await onClick();
  };

  const handleButtonAvailability = () => {
    if (balance != null && spreadCost && balance < spreadCost) {
      mainButton.setBgColor("#808080");
      mainButton.disable();
    } else {
      mainButton.setBgColor(color);
      mainButton.enable();
    }
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
    handleButtonAvailability();
  }, [spreadCost, balance]);
};

export default useSpreadButton;
