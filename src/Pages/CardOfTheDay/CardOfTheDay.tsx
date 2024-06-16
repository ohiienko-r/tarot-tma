import { useTranslation } from "react-i18next";
import { ReturnButton } from "@/Components";

const CardOfTheDay = () => {
  const { t } = useTranslation();
  return (
    <>
      <ReturnButton />
      <h2>{t("/card-of-the-day")}</h2>
    </>
  );
};

export default CardOfTheDay;
