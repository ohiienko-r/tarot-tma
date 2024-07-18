import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCloudStorage } from "@telegram-apps/sdk-react";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useReadings } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { ROUTES_NAMES } from "@/Router";
import { Path } from "@/types";

const useMainButtonTextAndHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path,
  prompt?: string
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const [disabled, setDisabled] = useState<boolean>(false);
  const { balance } = useBalance();
  const { t } = useTranslation();
  const cloudStorage = useCloudStorage();
  const showPopup = useLowBalancePopup(spreadPrice);
  const navigate = useNavigate();
  const handleRequestReadings = useReadings({
    cardsQty: cardsQty,
    path: path,
    prompt,
    spreadPrice: spreadPrice,
  });

  const mainButtonText = `${t("get spread")} ${spreadPrice} 🌕`;

  const handleNaviagteToQuestion = useCallback(() => {
    const locState = { spreadPrice: spreadPrice, cardsQty: cardsQty };

    navigate(ROUTES_NAMES.QUESTION_INPUT, {
      state: locState,
    });
  }, [spreadPrice, cardsQty, navigate]);

  const handleNoMoney = useMemo(
    () => () => {
      showPopup();
    },
    []
  );

  useEffect(() => {
    if (balance != null && balance < spreadPrice) {
      setHandler(() => handleNoMoney);
    } else if (path === ROUTES_NAMES.QUESTION) {
      setHandler(() => handleNaviagteToQuestion);
    } else {
      setHandler(() => handleRequestReadings);
    }
  }, [handleNoMoney, handleRequestReadings, path, spreadPrice]);

  useEffect(() => {
    const handleMainButtonDisabled = async () => {
      const myCard = await cloudStorage.get("myCard");
      if (path === ROUTES_NAMES.CARD_OF_THE_DAY && myCard !== "") {
        setDisabled(true);
      } else if (prompt?.length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };

    handleMainButtonDisabled();
  }, [cloudStorage, path, prompt]);

  return { mainButtonText, handler, disabled };
};

export default useMainButtonTextAndHandler;
