import { useEffect } from "react";
import { settingsButton } from "@/Telegram";

const useSettingsButton = (onClick: () => void) => {
  useEffect(() => {
    settingsButton.on("click", onClick);
    return () => settingsButton.off("click", onClick);
  }, [onClick]);

  useEffect(() => {
    settingsButton.show();
    return () => settingsButton.hide();
  }, []);
};

export default useSettingsButton;
