import { FC } from "react";
import { useTranslation } from "react-i18next";
import { cloudStorage, haptic } from "@/Telegram";
import {
  Modal,
  List,
  Headline,
  Button,
  Divider,
} from "@telegram-apps/telegram-ui";
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
    <Modal className="language-modal" open={open} dismissible={false}>
      <List className="language-modal__list">
        <Headline className="language-modal__list--headline" weight="2">
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
        <Button mode="plain" stretched onClick={onClose}>
          {t("cancel")}
        </Button>
      </List>
    </Modal>
  );
};

export default ChangeLanguageModal;
