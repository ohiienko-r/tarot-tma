import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCloudStorage } from "@tma.js/sdk-react";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useRandomCards } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { validateInitData } from "@/helpers";
import { getReadings } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { Path, SystemLanguage } from "@/types";

const useMainButtonTextAndHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path,
  prompt?: string
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const [disabled, setDisabled] = useState<boolean>(false);
  const { balance, updateBalance } = useBalance();
  const { cardsNames, cardsKeys } = useRandomCards(cardsQty);
  const { t, i18n } = useTranslation();
  const cloudStorage = useCloudStorage();
  const showPopup = useLowBalancePopup(spreadPrice);
  const navigate = useNavigate();

  const mainButtonText = `${t("get spread")} ${spreadPrice} 🌕`;

  const handleRequestReadings = useCallback(async () => {
    await updateBalance(-spreadPrice);

    try {
      if (await validateInitData()) {
        const response = await getReadings(
          cardsNames,
          i18n.language as SystemLanguage,
          path,
          prompt
        );

        const locState = {
          title: t(path),
          cardsKeys: cardsKeys,
          reading: response,
          fromPath: path,
        };

        navigate(ROUTES_NAMES.READINGS, {
          state: locState,
        });
      } else {
        console.log("Invalid initData");
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [
    spreadPrice,
    path,
    prompt,
    cardsNames,
    cardsKeys,
    t,
    i18n.language,
    updateBalance,
    navigate,
  ]);

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
  }, [handleNoMoney, handleRequestReadings]);

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
