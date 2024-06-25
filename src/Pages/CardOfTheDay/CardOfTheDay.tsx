import { useTranslation } from "react-i18next";
import { Page } from "@/Components";
import { getRandomCards } from "@/Cards/helpers";
import { SystemLanguage } from "@/types";

const CardOfTheDay = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const myCardOfTheDay = getRandomCards(1, currentLanguage as SystemLanguage);

  return (
    <Page>
      <h2>{t("/card-of-the-day")}</h2>
      <p>{currentLanguage}</p>
      <p>{myCardOfTheDay.cardsNames[0]}</p>
    </Page>
  );
};

export default CardOfTheDay;
