import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { usePopup } from "@tma.js/sdk-react";

const useLowBalancePopup = (spreadCost: number) => {
  const { t } = useTranslation();
  const { balance } = useBalance();
  const navigate = useNavigate();
  const popup = usePopup();

  const popupTitle = t("not enough");
  const popupMessage = `${t("spread requires")} ${spreadCost} 🌕, ${t(
    "but you have"
  )} ${balance} 🌕. ${t("get more coins")}`;

  const showLowBalancePopup = () => {
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
            console.log("Go home");
            break;
          default:
            console.log("No button pressed");
        }
      });
  };

  return showLowBalancePopup;
};

export default useLowBalancePopup;
