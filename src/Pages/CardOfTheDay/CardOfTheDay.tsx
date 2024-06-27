import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { useMainButton, useRandomCards } from "@/Hooks";
import { Page, SpreadBalancePad, Card } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const [responseText, setResponseText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(1);
  const { t, i18n } = useTranslation();

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

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      {!responseText && <SpreadBalancePad />}
      {cardsKeys.map((cardKey) => (
        <Card cardKey={cardKey} />
      ))}
      <p className="daily-card__spread-reading">{responseText}</p>
    </Page>
  );
};

export default CardOfTheDay;
