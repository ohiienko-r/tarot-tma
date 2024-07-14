import { FC, useState } from "react";
import { useSettingsButton } from "@/Hooks";
import { useUtils, useHapticFeedback } from "@telegram-apps/sdk-react";
import { IconButton, Modal, List, Button } from "@telegram-apps/telegram-ui";
import closeIcon from "@/assets/cancel_24.svg";
import "./styles.scss";

const Settings: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const utils = useUtils();
  const haptic = useHapticFeedback();

  const handleSettingsOpen = () => {
    haptic.impactOccurred("medium");
    setSettingsVisible(true);
  };

  const handleSettingsClose = () => {
    haptic.impactOccurred("medium");
    setSettingsVisible(false);
  };

  const handleOpenPrivacyPolicy = () => {
    utils.openLink(
      "https://www.freeprivacypolicy.com/live/94738508-a6fc-4fa1-9d84-7eaf1e08bd3e",
      { tryInstantView: true }
    );
  };

  useSettingsButton(handleSettingsOpen);

  return (
    <Modal
      className="settings"
      dismissible={false}
      open={settingsVisible}
      header={
        <Modal.Header
          after={
            <IconButton mode="plain" size="m" onClick={handleSettingsClose}>
              <img src={closeIcon} alt="Modal close" />
            </IconButton>
          }
        />
      }
    >
      <List className="settings__list">
        <Button mode="plain" stretched onClick={handleOpenPrivacyPolicy}>
          Privacy Policy
        </Button>
      </List>
    </Modal>
  );
};

export default Settings;
