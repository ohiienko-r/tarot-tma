import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backButton, haptic } from "@/Telegram";

const useBackButton = () => {
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
    backButton.on("click", handleGoBack);
    return () => {
      backButton.off("click", handleGoBack);
    };
  }, [handleGoBack]);
};

export default useBackButton;
