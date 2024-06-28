import { FC, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { useMainButton, useRandomCards, useLowBalancePopup } from "@/Hooks";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { getCardOfTheDayReading } from "@/API/API";
import { SystemLanguage } from "@/types";
import "./styles.scss";

import { ROUTES_NAMES } from "@/Router";
import { useNavigate } from "react-router-dom";

const CardOfTheDay: FC = () => {
  const { t, i18n } = useTranslation();
  const [mainButtonHandler, setMainButtonHandler] = useState<
    () => void | Promise<void>
  >(() => {});
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(1);
  const showPopup = useLowBalancePopup(3);
  const navigate = useNavigate();

  const mainButtonText = `${t("get spread")} 3 🌕`;

  const handleRequestReadings = useCallback(async () => {
    await updateBalance(-3);
    try {
      const response = await getCardOfTheDayReading(
        cardsNames,
        i18n.language as SystemLanguage
      );
      const locState = {
        title: t("/card-of-the-day"),
        cardsKeys: cardsKeys,
        reading: response,
      };
      navigate(ROUTES_NAMES.READINGS, {
        state: locState,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [cardsNames, cardsKeys, t, i18n.language, updateBalance, navigate]);

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

  useMainButton(mainButtonText, mainButtonHandler, false);

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <SpreadBalancePad />
      <Text>{t("card of the day desctiption")}</Text>
    </Page>
  );
};

export default CardOfTheDay;
