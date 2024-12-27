import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/Contexts";
import { useBackButton } from "@/Hooks";
import { Page } from "@/Components";
import { Button } from "@telegram-apps/telegram-ui";
import {
  hapticFeedback,
  openTelegramLink,
  openLink,
} from "@telegram-apps/sdk-react";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const countriesFlags: { [key in SystemLanguage]: string } = {
  en: "🇬🇧",
  uk: "🇺🇦",
  ru: "🇷🇺",
};

const availableLanguages: SystemLanguage[] = ["en", "uk", "ru"];

const Settings: FC = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  useBackButton();

  const handleOpenPrivacyPolicy = useCallback(() => {
    hapticFeedback.impactOccurred("medium");
    openLink(
      "https://www.freeprivacypolicy.com/live/94738508-a6fc-4fa1-9d84-7eaf1e08bd3e",
      { tryInstantView: true }
    );
  }, []);

  const handleContactUs = useCallback(() => {
    hapticFeedback.impactOccurred("medium");
    openTelegramLink("https://t.me/trlgst");
  }, []);

  const handleReportAbug = useCallback(() => {
    hapticFeedback.impactOccurred("medium");
    openTelegramLink("https://t.me/nam_ro");
  }, []);

  const handleNextLanguage = useCallback(async () => {
    hapticFeedback.impactOccurred("medium");
    const nextIndex =
      (availableLanguages.indexOf(language) + 1) % availableLanguages.length;
    await changeLanguage(availableLanguages[nextIndex]);
  }, [language, changeLanguage]);

  const handlePreviousLanguage = useCallback(async () => {
    hapticFeedback.impactOccurred("medium");
    const prevIndex =
      (availableLanguages.indexOf(language) - 1 + availableLanguages.length) %
      availableLanguages.length;
    await changeLanguage(availableLanguages[prevIndex]);
  }, [language, changeLanguage]);

  return (
    <Page className="settings">
      <h2 className="settings__heading">Settings</h2>
      <ul>
        <li className="settings__language">
          <p>{t("language")}</p>
          <div>
            <button onClick={handlePreviousLanguage}>{"<"}</button>
            <span>{countriesFlags[language]}</span>
            <button onClick={handleNextLanguage}>{">"}</button>
          </div>
        </li>
        <li>
          <Button onClick={handleOpenPrivacyPolicy}>Privacy policy</Button>
        </li>
        <li>
          <Button onClick={handleContactUs}>{t("contact us")}</Button>
        </li>
        <li>
          <Button onClick={handleReportAbug}>{t("report")}</Button>
        </li>
      </ul>
    </Page>
  );
};

export default Settings;
