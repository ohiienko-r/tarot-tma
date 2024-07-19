import { usePopup } from "@telegram-apps/sdk-react";

const useInfoPopup = () => {
  const popup = usePopup();

  const showPopup = (message: string, title?: string) => {
    popup.open({
      title: title,
      message: message,
      buttons: [{ id: "ok", type: "ok" }],
    });
  };

  return showPopup;
};

export default useInfoPopup;
