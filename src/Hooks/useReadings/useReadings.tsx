import { useCallback } from "react";
import { useUser } from "@/Contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { backButton, popup } from "@telegram-apps/sdk-react";
import { useRandomCards } from "@/Hooks";
import { Api } from "@/Api";
import { ROUTES_NAMES } from "@/Router";
import { SystemLanguage, Path } from "@/types";

type UseReadingsPropTypes = {
  cardsQty: number;
  path: Path;
  prompt?: string;
  spreadPrice: number;
};

const useReadings = ({
  cardsQty,
  path,
  prompt,
  spreadPrice,
}: UseReadingsPropTypes) => {
  const { updateBalance } = useUser();
  const { t, i18n } = useTranslation();
  const { cardsKeys, cardsNames } = useRandomCards(cardsQty);
  const navigate = useNavigate();

  const requestReadings = useCallback(async () => {
    try {
      //Validate init data
      if (!(await Api.botController.isInitDataValild())) {
        popup.open({
          message: "Init data is invalid",
          title: t("error title"),
        });
        return;
      }

      backButton.hide();

      //Retreive respective readings
      const reading = await Api.redingsController.getReadings(
        cardsNames,
        i18n.language as SystemLanguage,
        path,
        prompt
      );

      if (!reading) {
        popup.open({
          message:
            "Oops! Something happened to our tarologist. Please contact support.",
        });
        return;
      }

      await updateBalance(-spreadPrice);

      //Navigate to readings page with respective readings available
      navigate(ROUTES_NAMES.READINGS, {
        state: {
          title: t(path),
          cardsKeys,
          reading: reading,
          fromPath: path,
          prompt,
        },
      });
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }, [
    cardsNames,
    cardsKeys,
    i18n,
    spreadPrice,
    path,
    prompt,
    updateBalance,
    navigate,
    t,
  ]);

  return requestReadings;
};

export default useReadings;
