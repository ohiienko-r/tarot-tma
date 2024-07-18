import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "@/Contexts";
import { useLowBalancePopup, useReadings } from "@/Hooks";
import { ROUTES_NAMES } from "@/Router";
import { Path } from "@/types";

const useMainButtonHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path,
  prompt?: string
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const { balance } = useBalance();
  const showLowBalancePopup = useLowBalancePopup(spreadPrice);
  const navigate = useNavigate();
  const handleRequestReadings = useReadings({
    cardsQty: cardsQty,
    path: path,
    prompt,
    spreadPrice: spreadPrice,
  });

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
  }, [handleRequestReadings, path, spreadPrice]);

  return handler;
};

export default useMainButtonHandler;
