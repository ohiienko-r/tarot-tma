import { useEffect } from "react";
import { useBalance } from "@/Contexts";
import { useMainButton } from "@tma.js/sdk-react";
import { UseSpreadButton } from "./types";

const useSpreadButton = ({
  color,
  title,
  spreadCost,
  onClick,
}: UseSpreadButton) => {
  const { balance } = useBalance();
  const mainButton = useMainButton();

  mainButton.setText(title);

  useEffect(() => {
    mainButton.on("click", onClick);
    mainButton.show();
    return () => {
      mainButton.off("click", onClick);
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (balance && spreadCost && balance < spreadCost) {
      mainButton.setBgColor("#808080");
      mainButton.disable();
    } else {
      mainButton.setBgColor(color);
      mainButton.enable();
    }
  }, [spreadCost, balance]);
};

export default useSpreadButton;
