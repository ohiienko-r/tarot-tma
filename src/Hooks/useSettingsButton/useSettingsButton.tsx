import { useEffect } from "react";
import { initSettingsButton } from "@telegram-apps/sdk-react";

const useSettingsButton = (onClick: () => void) => {
  const [settingsButton] = initSettingsButton();

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
