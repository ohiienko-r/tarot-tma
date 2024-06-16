import { useTranslation } from "react-i18next";
import { ReturnButton } from "@/Components";

const AskCards = () => {
  const { t } = useTranslation();
  return (
    <>
      <ReturnButton />
      <h2>{t("/ask-question")}</h2>
    </>
  );
};

export default AskCards;
