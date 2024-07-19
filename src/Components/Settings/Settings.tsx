import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsButton } from "@/Hooks";
import { useUtils, useHapticFeedback } from "@telegram-apps/sdk-react";
import {
  IconButton,
  Modal,
  List,
  Button,
  Divider,
} from "@telegram-apps/telegram-ui";
import "./styles.scss";

const Settings: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const { t } = useTranslation();
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
    haptic.impactOccurred("medium");
    utils.openLink(
      "https://www.freeprivacypolicy.com/live/94738508-a6fc-4fa1-9d84-7eaf1e08bd3e",
      { tryInstantView: true }
    );
  };

  const handleContactUs = () => {
    haptic.impactOccurred("medium");
    utils.openTelegramLink("https://t.me/trlgst");
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.50552 4.4401C4.85466 4.08631 5.4245 4.08253 5.77829 4.43166L12.0036 10.575L18.229 4.43166C18.5828 4.08253 19.1526 4.08631 19.5018 4.4401C19.8509 4.79389 19.8471 5.36373 19.4933 5.71286L13.285 11.8395L19.4933 17.9661C19.8471 18.3152 19.8509 18.8851 19.5018 19.2389C19.1526 19.5927 18.5828 19.5964 18.229 19.2473L12.0036 13.1039L5.77829 19.2473C5.4245 19.5964 4.85466 19.5927 4.50552 19.2389C4.15639 18.8851 4.16017 18.3152 4.51396 17.9661L10.7223 11.8395L4.51396 5.71286C4.16017 5.36373 4.15639 4.79389 4.50552 4.4401Z"
                  fill="var(--tg-theme-link-color)"
                />
              </svg>
            </IconButton>
          }
        />
      }
    >
      <List className="settings__list">
        <Divider />
        <Button mode="plain" stretched onClick={handleOpenPrivacyPolicy}>
          Privacy Policy
        </Button>
        <Divider />
        <Button mode="plain" stretched onClick={handleContactUs}>
          {t("contact us")}
        </Button>
        <Divider />
      </List>
    </Modal>
  );
};

export default Settings;
