import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backButton, hapticFeedback } from "@telegram-apps/sdk-react";

const useBackButton = (customCallback?: () => void) => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    hapticFeedback.impactOccurred("medium");
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
      backButton.onClick(customCallback);
    } else {
      backButton.onClick(handleGoBack);
    }
    return () => {
      if (customCallback) {
        backButton.offClick(customCallback);
      } else {
        backButton.offClick(handleGoBack);
      }
    };
  }, [handleGoBack, customCallback]);
};

export default useBackButton;
