import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { popup, haptic } from "@/Telegram";
import { ROUTES_NAMES } from "@/Router";

const useQuitBehaviour = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useCallback(() => {
    haptic.notificationOccurred("warning");
    popup
      .open({
        title: t("warning"),
        message: t("quit message"),
        buttons: [
          { id: "cancel", type: "cancel" },
          { id: "quit", type: "destructive", text: t("quit anyway") },
        ],
      })
      .then((buttonId) => {
        if (buttonId === "quit") {
          haptic.impactOccurred("medium");
          navigate(ROUTES_NAMES.HOME);
        }
      });
  }, [navigate, t]);
};

export default useQuitBehaviour;
