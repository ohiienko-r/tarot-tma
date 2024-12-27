import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "react-i18next";
import { cloudStorage, initData } from "@telegram-apps/sdk-react";
import { SystemLanguage } from "@/types";

const availableLanguages: SystemLanguage[] = ["en", "uk", "ru"];

const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<SystemLanguage>("en");
  const { i18n } = useTranslation();
  const userLanguage = initData.user()?.languageCode;

  useEffect(() => {
    const handlePreferredLanguage = async () => {
      const preferredLanguage = await cloudStorage.getItem("preferredLanguage");

      if (preferredLanguage === "" && userLanguage) {
        if (availableLanguages.includes(userLanguage as SystemLanguage)) {
          i18n.changeLanguage(userLanguage);
          setLanguage(userLanguage as SystemLanguage);
          await cloudStorage.setItem("preferredLanguage", userLanguage);
        } else {
          i18n.changeLanguage("en");
          setLanguage("en");
          await cloudStorage.setItem("preferredLanguage", "en");
        }
      } else {
        i18n.changeLanguage(preferredLanguage);
      }
    };

    handlePreferredLanguage();
  }, [i18n, userLanguage]);

  const changeLanguage = useCallback(
    async (language: SystemLanguage) => {
      i18n.changeLanguage(language);
      setLanguage(language);
      await cloudStorage.setItem("preferredLanguage", language);
    },
    [i18n]
  );

  const providerValue = useMemo(
    () => ({ language, changeLanguage }),
    [language, changeLanguage]
  );

  return (
    <LanguageContext.Provider value={providerValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
