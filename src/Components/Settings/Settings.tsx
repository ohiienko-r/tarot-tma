import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsButton } from "@/Hooks";
import { haptic, utils } from "@/Telegram";
import { Icons, ChangeLanguageModal } from "@/Components";
import {
  IconButton,
  Modal,
  List,
  Button,
  Divider,
} from "@telegram-apps/telegram-ui";
import { countriesFlags } from "./Settings.dto";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const Settings: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [changeLanguageVisible, setChangeLanguageVisible] =
    useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const handleSettingsOpen = () => {
    haptic.impactOccurred("medium");
    setSettingsVisible(true);
  };

  const handleSettingsClose = () => {
    haptic.impactOccurred("medium");
    setSettingsVisible(false);
  };

  const handleChangeLanguageOpen = () => {
    haptic.impactOccurred("medium");
    setChangeLanguageVisible(true);
  };

  const handleChangeLanguageClose = () => {
    haptic.impactOccurred("medium");
    setChangeLanguageVisible(false);
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

  const handleReportAbug = () => {
    haptic.impactOccurred("medium");
    utils.openTelegramLink("https://t.me/nam_ro");
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
              <Icons.Close />
            </IconButton>
          }
        />
      }
    >
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
    </Modal>
  );
};

export default Settings;
