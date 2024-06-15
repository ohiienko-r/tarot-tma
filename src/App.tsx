import React from "react";
import { useTranslation } from "react-i18next";

interface AppProps {
  lang: string | null;
}

const App: React.FC<AppProps> = ({ lang }) => {
  const { i18n, t } = useTranslation();

  i18n.changeLanguage(lang ?? "english");

  return (
    <div>
      <h1>{t("hello")}</h1>
    </div>
  );
};

export default App;
