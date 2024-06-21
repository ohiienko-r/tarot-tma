import { useTranslation } from "react-i18next";

const CardOfTheDay = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("/card-of-the-day")}</h2>
    </>
  );
};

export default CardOfTheDay;
