import { usePopup } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const useErrorPopup = () => {
  const popup = usePopup();
  const { t } = useTranslation();

  const showErrorPopup = (errorMessage?: string) => {
    popup.open({
      title: t("error title"),
      message: errorMessage ?? t("error message"),
      buttons: [{ id: "ok", type: "ok" }],
    });
  };

  return showErrorPopup;
};

export default useErrorPopup;
