import { useState, useEffect } from "react";
import { useUser } from "@/Contexts";
import {
  useLowBalancePopup,
  useReadings,
  useNavigateToQuestion,
} from "@/Hooks";
import { ROUTES_NAMES } from "@/Router";
import { Path } from "@/types";

const useMainButtonHandler = (
  spreadPrice: number,
  cardsQty: number,
  path: Path,
  prompt?: string
) => {
  const [handler, setHandler] = useState<() => void | Promise<void>>(() => {});
  const { balance } = useUser();
  const showLowBalancePopup = useLowBalancePopup(spreadPrice);
  const handleRequestReadings = useReadings({
    cardsQty: cardsQty,
    path: path,
    prompt,
    spreadPrice: spreadPrice,
  });
  const handleNaviagteToQuestion = useNavigateToQuestion(spreadPrice, cardsQty);

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
