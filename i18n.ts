import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import uk from "./locales/uk/transation.json";
import ru from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    uk: {
      translation: uk,
    },
    ru: {
      translation: ru,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
