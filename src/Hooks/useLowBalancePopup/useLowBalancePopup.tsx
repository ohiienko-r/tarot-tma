import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "@/Contexts";
import { popup } from "@telegram-apps/sdk-react";
import { ROUTES_NAMES } from "@/Router";

const useLowBalancePopup = (spreadCost: number) => {
  const { t } = useTranslation();
  const { balance } = useUser();
  const navigate = useNavigate();

  const popupTitle = t("not enough");
  const popupMessage = `${t("spread requires")} ${spreadCost} 🌕, ${t(
    "but you have"
  )} ${balance} 🌕. ${t("get more coins")}`;

  const showLowBalancePopup = useCallback(() => {
    popup
      .open({
        title: popupTitle,
        message: popupMessage,
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
  }, [navigate, popupMessage, popupTitle, t]);

  return showLowBalancePopup;
};

export default useLowBalancePopup;
