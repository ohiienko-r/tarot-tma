import { FC, useCallback } from "react";
import { useUser, useLanguage } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { useBackButton } from "@/Hooks";
import { Page, Icons } from "@/Components";
import { Button, Switch } from "@telegram-apps/telegram-ui";
import {
  hapticFeedback,
  openTelegramLink,
  openLink,
  popup,
} from "@telegram-apps/sdk-react";
import { supabase } from "@/supabase";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const countriesFlags: { [key in SystemLanguage]: string } = {
  en: "🇬🇧",
  uk: "🇺🇦",
  ru: "🇷🇺",
};

const availableLanguages: SystemLanguage[] = ["en", "uk", "ru"];

const Settings: FC = () => {
  const { user } = useUser();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  useBackButton();

  const handleToggleDailyReminder = async (remind: boolean) => {
    hapticFeedback.impactOccurred("medium");
    const { error } = await supabase
      .from("users")
      .update({ daily_reminder: remind })
      .eq("id", user?.id);

    if (error) {
      console.error(JSON.stringify(error));
      popup.open({
        message: "Failed to toggle daily reminder. Please contact support.",
        title: "Error!",
      });
    }
  };

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
      <h2 className="settings__heading">{t("settings")}</h2>
      <ul className="settings__list">
        <li className="settings__language">
          <p>{t("language")}</p>
          <div className="settings__language--buttons-container">
            <button
              onClick={handlePreviousLanguage}
              className="settings__language--change-button"
            >
              {<Icons.Chevron direction="left" stroke="#FFFFFF" />}
            </button>
            <span>{countriesFlags[language]}</span>
            <button
              onClick={handleNextLanguage}
              className="settings__language--change-button"
            >
              {<Icons.Chevron stroke="#FFFFFF" />}
            </button>
          </div>
        </li>
        <li className="settings__notifications">
          <div>
            <p>{t("daily notifications")}</p>
            <p className="settings__notifications--sub-caption">
              <i>{t("nota bene")}</i>
            </p>
          </div>
          <Switch
            defaultChecked={user?.daily_reminder}
            onChange={async (e) => {
              await handleToggleDailyReminder(e.currentTarget.checked);
            }}
          />
        </li>
        <li>
          <Button
            mode="outline"
            stretched
            onClick={handleOpenPrivacyPolicy}
            after={<Icons.ExternalLink />}
          >
            Privacy policy
          </Button>
        </li>
        <li>
          <Button
            mode="outline"
            stretched
            onClick={handleContactUs}
            after={<Icons.ExternalLink />}
          >
            {t("contact us")}
          </Button>
        </li>
        <li>
          <Button
            mode="outline"
            stretched
            onClick={handleReportAbug}
            after={<Icons.ExternalLink />}
          >
            {t("report")}
          </Button>
        </li>
      </ul>
    </Page>
  );
};

export default Settings;
