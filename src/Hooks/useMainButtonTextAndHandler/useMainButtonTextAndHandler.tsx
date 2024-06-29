import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useRandomCards } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { getCardOfTheDayReading } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { SystemLanguage } from "@/types";

const useMainButtonTextAndHandler = (spreadPrice: number, cardsQty: number) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(cardsQty);
  const { t, i18n } = useTranslation();
  const showPopup = useLowBalancePopup(spreadPrice);
  const navigate = useNavigate();

  const mainButtonText = `${t("get spread")} ${spreadPrice} 🌕`;

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

  const handleNoMoney = useMemo(
    () => () => {
      showPopup();
    },
    []
  );

  useEffect(() => {
    if (balance != null && balance < 3) {
      setHandler(() => handleNoMoney);
    } else {
      setHandler(() => handleRequestReadings);
    }
  }, [handleNoMoney, handleRequestReadings]);

  return { mainButtonText, handler };
};

export default useMainButtonTextAndHandler;
