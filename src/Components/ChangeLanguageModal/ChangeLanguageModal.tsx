import { FC } from "react";
import { useTranslation } from "react-i18next";
import { cloudStorage, haptic } from "@/Telegram";
import { Modal } from "..";
import { List, Button, Divider } from "@telegram-apps/telegram-ui";
import { SystemLanguage } from "@/types";
import { ChangeLanguageModalPropTypes } from "./types";
import "./styles.scss";

const ChangeLanguageModal: FC<ChangeLanguageModalPropTypes> = ({
  open,
  onClose,
}) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = async (language: SystemLanguage) => {
    haptic.impactOccurred("medium");
    i18n.changeLanguage(language);
    onClose();
    await cloudStorage.set("preferredLanguage", language);
  };

  return (
    <Modal.FullScreen
      open={open}
      onClose={onClose}
      title={t("select language")}
    >
      <List className="language-modal__list">
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
        <Button mode="plain" stretched onClick={onClose}>
          {t("cancel")}
        </Button>
      </List>
    </Modal.FullScreen>
  );
};

export default ChangeLanguageModal;
