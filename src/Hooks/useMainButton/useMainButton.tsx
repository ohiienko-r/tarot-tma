import { useState, useEffect } from "react";
import { haptic, mainButton } from "@/Telegram";

const useMainButton = (
  title: string,
  onClick: () => Promise<void> | void,
  disabled: boolean
) => {
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      await onClick();
      setLoading(false);
      mainButton.hideLoader();
      mainButton.enable();
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

  return loading;
};

export default useMainButton;
