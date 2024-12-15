import { useCallback } from "react";
import { useUser } from "@/Contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { backButton, popup } from "@telegram-apps/sdk-react";
import { useRandomCards, useAds } from "@/Hooks";
import { Api } from "@/Api";
import { ROUTES_NAMES } from "@/Router";
import { SystemLanguage } from "@/types";
import { UseReadingsPropTypes } from "./types";

const useReadings = ({
  cardsQty,
  path,
  prompt,
  spreadPrice,
}: UseReadingsPropTypes) => {
  const { updateBalance } = useUser();
  const { t, i18n } = useTranslation();
  const { cardsKeys, cardsNames } = useRandomCards(cardsQty);
  const showAdvertisment = useAds();
  const navigate = useNavigate();

  const isInitDataValid = useCallback(async () => {
    const isValid = await Api.botController.validateInitData();
    if (!isValid) {
      popup.open({ message: "Init data is invalid", title: t("error title") });
      return false;
    } else {
      return true;
    }
  }, [t]);

  const getReadings = useCallback(async () => {
    return await Api.redingsController.getReadings(
      cardsNames,
      i18n.language as SystemLanguage,
      path,
      prompt
    );
  }, [cardsNames, i18n, path, prompt]);

  const onReadingAvailable = useCallback(
    async (reading: string) => {
      await updateBalance(-spreadPrice);

      navigate(ROUTES_NAMES.READINGS, {
        state: {
          title: t(path),
          cardsKeys,
          reading: reading,
          fromPath: path,
          prompt,
        },
      });
    },
    [cardsKeys, path, prompt, spreadPrice, t, navigate, updateBalance]
  );

  const requestReadings = useCallback(async () => {
    try {
      if (!(await isInitDataValid())) return;

      showAdvertisment();

      backButton.hide();

      const reading = await getReadings();

      await onReadingAvailable(reading as string);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      popup.open({ message: t("error message"), title: t("error title") });
    }
  }, [isInitDataValid, showAdvertisment, getReadings, onReadingAvailable, t]);

  return requestReadings;
};

export default useReadings;
