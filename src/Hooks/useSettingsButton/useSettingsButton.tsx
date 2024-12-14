import { useEffect } from "react";
import { settingsButton } from "@telegram-apps/sdk-react";

const useSettingsButton = (onClick: () => void) => {
  useEffect(() => {
    settingsButton.onClick(onClick);
    return () => settingsButton.offClick(onClick);
  }, [onClick]);

  useEffect(() => {
    settingsButton.show();
    return () => settingsButton.hide();
  }, []);
};

export default useSettingsButton;
