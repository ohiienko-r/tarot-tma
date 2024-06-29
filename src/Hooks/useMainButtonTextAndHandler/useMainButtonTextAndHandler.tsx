import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useRandomCards } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { getReadings } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { Path, SystemLanguage } from "@/types";

const useMainButtonTextAndHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(cardsQty);
  const { t, i18n } = useTranslation();
  const showPopup = useLowBalancePopup(spreadPrice);
  const navigate = useNavigate();

  const mainButtonText = `${t("get spread")} ${spreadPrice} 🌕`;

  const handleRequestReadings = useCallback(async () => {
    await updateBalance(-spreadPrice);
    try {
      const response = await getReadings(
        cardsNames,
        i18n.language as SystemLanguage,
        path
      );
      const locState = {
        title: t(path),
        cardsKeys: cardsKeys,
        reading: response,
      };
      navigate(ROUTES_NAMES.READINGS, {
        state: locState,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [
    spreadPrice,
    path,
    cardsNames,
    cardsKeys,
    t,
    i18n.language,
    updateBalance,
    navigate,
  ]);

  const handleNoMoney = useMemo(
    () => () => {
      showPopup();
    },
    []
  );

  useEffect(() => {
    if (balance != null && balance < spreadPrice) {
      setHandler(() => handleNoMoney);
    } else {
      setHandler(() => handleRequestReadings);
    }
  }, [handleNoMoney, handleRequestReadings]);

  return { mainButtonText, handler };
};

export default useMainButtonTextAndHandler;
