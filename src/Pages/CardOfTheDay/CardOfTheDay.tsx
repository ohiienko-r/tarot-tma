import { FC, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import {
  useMainButton,
  useRandomCards,
  useLowBalancePopup,
  useShareBotUrl,
} from "@/Hooks";
import { Page, SpreadBalancePad, CardsGroup, SubmitButton } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const { t, i18n } = useTranslation();
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

  const mainButtonText = `${t("get spread")} 3 🌕`;

  const handleRequestReadings = useCallback(async () => {
    await updateBalance(-3);
    try {
      const response = await getCardOfTheDayReading(
        cardsNames,
        i18n.language as SystemLanguage
      );
      setCardsVisible(true);
      setResponseText(response);
    } catch (error) {
      setResponseText(`${error}`);
    }
  }, [cardsNames, i18n.language, updateBalance]);

  const handleNoMoney = useCallback(() => {
    showPopup();
  }, [showPopup]);

  useEffect(() => {
    if (balance != null && balance < 3) {
      setMainButtonHandler(() => handleNoMoney);
    } else {
      setMainButtonHandler(() => handleRequestReadings);
    }
  }, [handleNoMoney, handleRequestReadings, balance]);

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
        {cardsVisible && (
          <SubmitButton title={t("share")} onPress={shareBotUrl} />
        )}
      </div>
    </Page>
  );
};

export default CardOfTheDay;
