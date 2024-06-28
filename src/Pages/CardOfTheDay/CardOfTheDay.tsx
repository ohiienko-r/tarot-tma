import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import {
  useMainButton,
  useRandomCards,
  useLowBalancePopup,
  useShareBotUrl,
} from "@/Hooks";
import { Page, SpreadBalancePad, CardsGroup } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const { t, i18n } = useTranslation();
  const [mainButtonText, setMainButtonText] = useState<string>(
    `${t("get spread")} 3 🌕`
  );
  const [mainButonHandler, setMainButtonHandler] = useState<
    () => void | Promise<void>
  >(() => {});
  const [responseText, setResponseText] = useState<string>(
    t("card of the day desctiption")
  );
  const [cardsVisible, setCardsVisible] = useState<boolean>(false);
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(1);
  const showPopup = useLowBalancePopup(3);
  const shareBotUrl = useShareBotUrl();

  useEffect(() => {
    const handleRequestReadings = async () => {
      await updateBalance(-3);
      try {
        const response = await getCardOfTheDayReading(
          cardsNames,
          i18n.language as SystemLanguage
        );
        setCardsVisible(true);
        setResponseText(response);
        setMainButtonText(t("share"));
        setMainButtonHandler(shareBotUrl);
      } catch (error) {
        setResponseText(`${error}`);
      }
    };

    const handleNoMoney = () => {
      showPopup();
    };

    if (balance != null && balance < 3) {
      setMainButtonHandler(() => handleNoMoney);
    } else {
      setMainButtonHandler(() => handleRequestReadings);
    }
  }, [cardsNames, i18n.language, t, updateBalance, showPopup]);

  useMainButton(mainButtonText, mainButonHandler, false);

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <SpreadBalancePad />
      <div className="daily-card__spread">
        {cardsVisible && <CardsGroup cardsKeys={cardsKeys} />}
        <p className="daily-card__spread--text">{responseText}</p>
      </div>
    </Page>
  );
};

export default CardOfTheDay;
