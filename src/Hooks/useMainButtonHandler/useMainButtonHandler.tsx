import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/Contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadings } from "@/Hooks";
import { popup } from "@telegram-apps/sdk-react";
import { ROUTES_NAMES } from "@/Router";
import { Path } from "@/types";

const useMainButtonHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path,
  prompt?: string
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { balance } = useUser();
  const handleRequestReadings = useReadings({
    cardsQty: cardsQty,
    path: path,
    prompt,
    spreadPrice: spreadPrice,
  });

  const showLowBalancePopup = useCallback(() => {
    popup
      .open({
        title: t("not enough"),
        message: `${t("spread requires")} ${spreadPrice} 🌕, ${t(
          "but you have"
        )} ${balance} 🌕. ${t("get more coins")}`,
        buttons: [
          { id: "decline", type: "cancel" },
          { id: "submit", type: "default", text: t("get coins") },
        ],
      })
      .then((buttonId) => {
        switch (buttonId) {
          case "decline":
            navigate(-1);
            break;
          case "submit":
            navigate(ROUTES_NAMES.PAYMENT);
            break;
          default:
            console.log("No button pressed");
        }
      });
  }, [t, balance, spreadPrice, navigate]);

  const handleNaviagteToQuestion = useCallback(() => {
    const locState = { spreadPrice: spreadPrice, cardsQty: cardsQty };

    navigate(ROUTES_NAMES.QUESTION_INPUT, {
      state: locState,
    });
  }, [spreadPrice, cardsQty, navigate]);

  useEffect(() => {
    if (balance != null && balance < spreadPrice) {
      setHandler(() => showLowBalancePopup);
    } else if (path === ROUTES_NAMES.QUESTION) {
      setHandler(() => handleNaviagteToQuestion);
    } else {
      setHandler(() => handleRequestReadings);
    }
  }, [
    balance,
    path,
    spreadPrice,
    showLowBalancePopup,
    handleRequestReadings,
    handleNaviagteToQuestion,
  ]);

  return handler;
};

export default useMainButtonHandler;
