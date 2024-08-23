import { useCallback } from "react";
import { useBalance } from "@/Contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdsgram } from "@/AdsGram";
import { backButton } from "@/Telegram";
import { useRandomCards, useInfoPopup } from "@/Hooks";
import { validateInitData } from "@/helpers";
import { getReadings } from "@/API/API";
import { ROUTES_NAMES } from "@/Router";
import { SystemLanguage } from "@/types";
import { UseReadingsPropTypes } from "./types";

const useReadings = ({
  cardsQty,
  path,
  prompt,
  spreadPrice,
}: UseReadingsPropTypes) => {
  const { updateBalance } = useBalance();
  const { t, i18n } = useTranslation();
  const { cardsKeys, cardsNames } = useRandomCards(cardsQty);
  const showAd = useAdsgram({ blockId: "586" });
  const showInfoPopup = useInfoPopup();
  const navigate = useNavigate();

  const requestReadings = useCallback(async () => {
    try {
      if (!(await validateInitData())) {
        showInfoPopup("Init data is invalid", t("error title"));
        return;
      }

      showAd();

      backButton.hide();

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
        prompt: prompt,
      };

      await updateBalance(-spreadPrice);

      navigate(ROUTES_NAMES.READINGS, {
        state: locState,
      });
    } catch (error) {
      console.error(`Error occured: ${error}`);
      showInfoPopup(t("error message"), t("error title"));
      return;
    }
  }, [
    spreadPrice,
    path,
    prompt,
    cardsNames,
    cardsKeys,
    i18n.language,
    t,
    navigate,
    showAd,
    showInfoPopup,
    updateBalance,
  ]);

  return requestReadings;
};

export default useReadings;
