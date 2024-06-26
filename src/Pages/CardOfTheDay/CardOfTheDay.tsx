import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { useMainButton } from "@/Hooks";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getRandomCards } from "@/Cards/helpers";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage, RandomCards } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const [myCards, setMyCards] = useState<RandomCards | null>(null);
  const [responseText, setResponseText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { balance, updateBalance } = useBalance();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const cards = getRandomCards(1, i18n.language as SystemLanguage);
    setMyCards(cards);
  }, [i18n]);

  useEffect(() => {
    const handleButtonAvailability = () => {
      if (balance != null && balance < 3) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    };

    handleButtonAvailability();
  }, [balance]);

  const getReadings = async () => {
    if (myCards?.cardsNames) {
      const response = await getCardOfTheDayReading(
        myCards?.cardsNames,
        i18n.language as SystemLanguage
      );
      setResponseText(response);
    } else {
      setResponseText("Something went wrong.");
    }
  };

  const handleMainButtonClick = async () => {
    await updateBalance(-3);
    await getReadings();
  };

  useMainButton(t("get answer"), handleMainButtonClick, buttonDisabled);

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <SpreadBalancePad />
      <p>{myCards?.cardsNames[0]}</p>
      <p>{responseText}</p>
    </Page>
  );
};

export default CardOfTheDay;
