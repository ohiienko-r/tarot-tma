import { useCallback } from "react";
import { popup } from "@/Telegram";

const useInfoPopup = () => {
  const showPopup = useCallback((message: string, title?: string) => {
    popup.open({
      title: title,
      message: message,
      buttons: [{ id: "ok", type: "ok" }],
    });
  }, []);

  return showPopup;
};

export default useInfoPopup;
