import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsButton } from "@/Hooks";
import {
  useUtils,
  useHapticFeedback,
  useCloudStorage,
} from "@telegram-apps/sdk-react";
import { CloseIcon, ChevronIcon } from "@/Components";
import {
  IconButton,
  Modal,
  List,
  Button,
  Divider,
  Headline,
} from "@telegram-apps/telegram-ui";
import { countriesFlags } from "./Settings.dto";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const Settings: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [changeLanguageVisivle, setChangeLanguageVisible] = useState<boolean>();
  const { t, i18n } = useTranslation();
  const utils = useUtils();
  const haptic = useHapticFeedback();
  const cloudStorage = useCloudStorage();

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

  const handleChangeLanguage = async (language: SystemLanguage) => {
    haptic.impactOccurred("medium");
    i18n.changeLanguage(language);
    setChangeLanguageVisible(false);
    await cloudStorage.set("preferredLanguage", language);
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
              <CloseIcon />
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
          after={<ChevronIcon />}
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
      </List>
      <Modal
        className="settings__language-modal"
        open={changeLanguageVisivle}
        dismissible={false}
      >
        <List className="settings__list">
          <Headline className="settings__list--headline" weight="2">
            {t("select language")}
          </Headline>
          <Button
            mode="bezeled"
            stretched
            onClick={() => {
              handleChangeLanguage("en");
            }}
          >
            {`English 🇬🇧`}
          </Button>
          <Divider />
          <Button
            mode="bezeled"
            stretched
            onClick={() => {
              handleChangeLanguage("uk");
            }}
          >
            {`Українська 🇺🇦`}
          </Button>
          <Divider />
          <Button
            mode="bezeled"
            stretched
            onClick={() => {
              handleChangeLanguage("ru");
            }}
          >
            {`Русский 🇷🇺`}
          </Button>
          <Button mode="plain" stretched onClick={handleChangeLanguageClose}>
            {t("cancel")}
          </Button>
        </List>
      </Modal>
    </Modal>
  );
};

export default Settings;
