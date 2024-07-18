import { useCallback } from "react";
import { useBalance } from "@/Contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdsgram } from "@/AdsGram";
import { useErrorPopup, useRandomCards } from "@/Hooks";
import { validateInitData } from "@/helpers";
import { getReadings } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { SystemLanguage } from "@/types";
import { UseReadingsPropTypes } from "./types";

// blockId: "586", //production id
// blockId: "600", //dev id
// blockId: "813", //dev 3 id

const useReadings = ({
  cardsQty,
  path,
  prompt,
  spreadPrice,
}: UseReadingsPropTypes) => {
  const { updateBalance } = useBalance();
  const { t, i18n } = useTranslation();
  const { cardsKeys, cardsNames } = useRandomCards(cardsQty);
  const showAd = useAdsgram({ blockId: "813" });
  const showErrorPopup = useErrorPopup();
  const navigate = useNavigate();

  const requestReadings = useCallback(async () => {
    try {
      if (!(await validateInitData())) {
        showErrorPopup("InitData is invalid");
        return;
      }

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
    } catch (error) {
      console.error(`Error occured: ${error}`);
      showErrorPopup();
      return;
    }
  }, [spreadPrice, path, prompt, cardsNames, cardsKeys, i18n.language]);

  return requestReadings;
};

export default useReadings;
