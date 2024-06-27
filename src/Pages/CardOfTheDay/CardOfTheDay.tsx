import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { useMainButton, useRandomCards } from "@/Hooks";
import { Page, SpreadBalancePad, CardsGroup } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const [responseText, setResponseText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [cardsFlipped, setCardsFlipped] = useState<boolean>(false);
  const [cardsVisible, setCardsVisible] = useState<boolean>(false);
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(1);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (balance != null && balance < 3) {
      setButtonDisabled(true);
      setCardsVisible(false);
    } else {
      setButtonDisabled(false);
      setCardsVisible(true);
    }
  }, []);

  const getReadings = async () => {
    try {
      const response = await getCardOfTheDayReading(
        cardsNames,
        i18n.language as SystemLanguage
      );
      setResponseText(response);
    } catch (error) {
      setResponseText(`${error}`);
    }
  };

  const handleMainButtonClick = async () => {
    await updateBalance(-3);
    await getReadings();
  };

  useMainButton(t("get answer"), handleMainButtonClick, buttonDisabled);

  useEffect(() => {
    if (!cardsFlipped) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [cardsFlipped]);

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      {!responseText && <SpreadBalancePad />}
      {cardsVisible && (
        <CardsGroup
          cardsKeys={cardsKeys}
          cardsFlipped={cardsFlipped}
          setCardsFlipped={setCardsFlipped}
        />
      )}
      {!cardsVisible && (
        <p>
          We're sorry to say that you don't have enough coins on your balance.
        </p>
      )}
      <p className="daily-card__spread-reading">{responseText}</p>
    </Page>
  );
};

export default CardOfTheDay;
