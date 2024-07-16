import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCloudStorage } from "@telegram-apps/sdk-react";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useRandomCards, useErrorPopup } from "@/Hooks";
import { useAdsgram } from "@/AdsGram";
import { useTranslation } from "react-i18next";
import { validateInitData } from "@/helpers";
import { getReadings } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { Path, SystemLanguage } from "@/types";

// blockId: "586", //production id
// blockId: "600", //dev id
// blockId: "813", //dev 3 id

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
  const showAd = useAdsgram({ blockId: "586" });
  const showPopup = useLowBalancePopup(spreadPrice);
  const showErrorPopup = useErrorPopup();
  const navigate = useNavigate();

  const mainButtonText = `${t("get spread")} ${spreadPrice} 🌕`;

  const handleRequestReadings = useCallback(async () => {
    try {
      if (await validateInitData()) {
        showAd();

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

        await updateBalance(-spreadPrice);

        navigate(ROUTES_NAMES.READINGS, {
          state: locState,
        });
      } else {
        showErrorPopup("InitData is invalid");
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      showErrorPopup();
      return;
    }
  }, [spreadPrice, path, prompt, cardsNames, cardsKeys, i18n.language]);

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
