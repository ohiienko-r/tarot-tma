import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./locales/english/translation.json";
import ukrainian from "./locales/ukrainian/transation.json";
import russian from "./locales/russian/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    english: {
      translation: english,
    },
    ukrainian: {
      translation: ukrainian,
    },
    russian: {
      translation: russian,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
