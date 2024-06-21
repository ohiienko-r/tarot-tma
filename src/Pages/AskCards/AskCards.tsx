import { useTranslation } from "react-i18next";

const AskCards = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("/ask-question")}</h2>
    </>
  );
};

export default AskCards;
