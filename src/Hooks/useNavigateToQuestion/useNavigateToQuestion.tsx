import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "@/Router";

const useNavigateToQuestion = (spreadPrice: number, cardsQty: number) => {
  const navigate = useNavigate();

  const naviagteToQuestion = useCallback(() => {
    const locState = { spreadPrice: spreadPrice, cardsQty: cardsQty };

    navigate(ROUTES_NAMES.QUESTION_INPUT, {
      state: locState,
    });
  }, [spreadPrice, cardsQty, navigate]);

  return naviagteToQuestion;
};

export default useNavigateToQuestion;
