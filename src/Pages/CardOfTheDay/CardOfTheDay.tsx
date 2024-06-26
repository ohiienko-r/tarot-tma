import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getRandomCards } from "@/Cards/helpers";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage, RandomCards } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const [myCards, setMyCards] = useState<RandomCards | null>(null);
  const [readingText, setReadingText] = useState("");
  const { updateBalance } = useBalance();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const cards = getRandomCards(1, i18n.language as SystemLanguage);
    setMyCards(cards);
  }, [i18n]);

  const handleMainButtonClick = async () => {
    await updateBalance(-3);
    await getReadings();
  };

  const getReadings = async () => {
    if (myCards?.cardsNames) {
      const res = await getCardOfTheDayReading(
        myCards?.cardsNames,
        i18n.language as SystemLanguage
      );

      setReadingText(res);
    } else {
      setReadingText("No cards");
    }
  };

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <SpreadBalancePad />
      <p>{myCards?.cardsNames[0]}</p>
      <p>{readingText}</p>
      <button onClick={handleMainButtonClick}>Get readings</button>
    </Page>
  );
};

export default CardOfTheDay;
