import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsButton } from "@/Hooks";
import {
  hapticFeedback,
  openLink,
  openTelegramLink,
} from "@telegram-apps/sdk-react";
import { Icons, ChangeLanguageModal, Modal } from "@/Components";
import { List, Button, Divider } from "@telegram-apps/telegram-ui";
import { countriesFlags } from "./Settings.dto";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const Settings: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [changeLanguageVisible, setChangeLanguageVisible] =
    useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const handleSettingsOpen = () => {
    hapticFeedback.impactOccurred("medium");
    setSettingsVisible(true);
  };

  const handleSettingsClose = () => {
    hapticFeedback.impactOccurred("medium");
    setSettingsVisible(false);
  };

  const handleChangeLanguageOpen = () => {
    hapticFeedback.impactOccurred("medium");
    setChangeLanguageVisible(true);
  };

  const handleChangeLanguageClose = () => {
    hapticFeedback.impactOccurred("medium");
    setChangeLanguageVisible(false);
  };

  const handleOpenPrivacyPolicy = () => {
    hapticFeedback.impactOccurred("medium");
    openLink(
      "https://www.freeprivacypolicy.com/live/94738508-a6fc-4fa1-9d84-7eaf1e08bd3e",
      { tryInstantView: true }
    );
  };

  const handleContactUs = () => {
    hapticFeedback.impactOccurred("medium");
    openTelegramLink("https://t.me/trlgst");
  };

  const handleReportAbug = () => {
    hapticFeedback.impactOccurred("medium");
    openTelegramLink("https://t.me/nam_ro");
  };

  useSettingsButton(handleSettingsOpen);

  return (
    <Modal.FullScreen open={settingsVisible} onClose={handleSettingsClose}>
      <List className="settings__list">
        <Divider />
        <Button
          mode="plain"
          stretched
          onClick={handleChangeLanguageOpen}
          after={<Icons.Chevron />}
        >
          {`${t("language")}: ${
            countriesFlags[i18n.language as SystemLanguage]
          }`}
        </Button>
        <Divider />
        <Button mode="plain" stretched onClick={handleOpenPrivacyPolicy}>
          Privacy Policy
        </Button>
        <Divider />
        <Button mode="plain" stretched onClick={handleContactUs}>
          {t("contact us")}
        </Button>
        <Divider />
        <Button mode="plain" stretched onClick={handleReportAbug}>
          {t("report")}
        </Button>
        <Divider />
      </List>
      <ChangeLanguageModal
        open={changeLanguageVisible}
        onClose={handleChangeLanguageClose}
      />
    </Modal.FullScreen>
  );
};

export default Settings;
