import { useEffect } from "react";
import { useQuery } from "@/Hooks";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const query = useQuery();
  const lang = query.get("lang");

  useEffect(() => {
    if (lang) {
      localStorage.setItem("language", lang);
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("english");
      localStorage.setItem("language", "english");
    }
  }, [lang, i18n]);
};

export default useLanguage;
