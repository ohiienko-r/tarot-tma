import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backButton, haptic } from "@/Telegram";

const useBackButton = (customCallback?: () => void) => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    haptic.impactOccurred("medium");
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    backButton.show();
    return () => {
      backButton.hide();
    };
  }, []);

  useEffect(() => {
    if (customCallback) {
      backButton.on("click", customCallback);
    } else {
      backButton.on("click", handleGoBack);
    }
    return () => {
      if (customCallback) {
        backButton.off("click", customCallback);
      } else {
        backButton.off("click", handleGoBack);
      }
    };
  }, [handleGoBack, customCallback]);
};

export default useBackButton;
