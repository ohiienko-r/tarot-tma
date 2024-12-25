import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useBackButton } from "@/Hooks";
import { Page } from "@/Components";
import { Button } from "@telegram-apps/telegram-ui";
import {
  hapticFeedback,
  openTelegramLink,
  openLink,
} from "@telegram-apps/sdk-react";
import { SystemLanguage } from "@/types";

const countriesFlags: { [key in SystemLanguage]: string } = {
  en: "🇬🇧",
  uk: "🇺🇦",
  ru: "🇷🇺",
};

const Settings: FC = () => {
  const { t, i18n } = useTranslation();
  useBackButton();
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

  return (
    <Page>
      <h2>Settings</h2>
      <ul>
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
