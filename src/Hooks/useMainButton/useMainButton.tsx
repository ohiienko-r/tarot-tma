import { useEffect } from "react";
import { initMainButton, initHapticFeedback } from "@tma.js/sdk-react";

const [mainButton] = initMainButton();
const haptic = initHapticFeedback();

const useMainButton = (
  title: string,
  onClick: () => Promise<void>,
  disabled: boolean
) => {
  useEffect(() => {
    mainButton.setText(title);
    mainButton.show();
    return () => {
      mainButton.hide();
    };
  }, [title]);

  useEffect(() => {
    const handler = async () => {
      haptic.impactOccurred("medium");
      mainButton.disable();
      mainButton.showLoader();
      await onClick();
      mainButton.hideLoader();
      mainButton.hide();
    };

    mainButton.on("click", handler);

    return () => {
      mainButton.off("click", handler);
    };
  }, [onClick]);

  useEffect(() => {
    if (disabled) {
      mainButton.disable();
      mainButton.setBgColor("#808080");
    } else {
      mainButton.enable();
      mainButton.setBgColor("#EA850F");
    }
  }, [disabled]);
};

export default useMainButton;
