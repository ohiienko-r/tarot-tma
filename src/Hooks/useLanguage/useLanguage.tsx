import { useEffect } from "react";
import { useQuery } from "@/Hooks";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const query = useQuery();
  const lang = query.get("lang");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (lang) {
      localStorage.setItem("language", lang);
      i18n.changeLanguage(lang);
    } else if (storedLang) {
      i18n.changeLanguage(storedLang);
    } else {
      i18n.changeLanguage("english");
      localStorage.setItem("language", "english");
    }
  }, [lang, i18n]);
};

export default useLanguage;
