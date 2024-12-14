import { useCallback } from "react";
import { popup } from "@telegram-apps/sdk-react";

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
