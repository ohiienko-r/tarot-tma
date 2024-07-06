import { useTranslation } from "react-i18next";
import { usePopup } from "@tma.js/sdk-react";

const useRewardPopup = () => {
  const { t } = useTranslation();
  const popup = usePopup();

  const showRewardPopup = () => {
    popup.open({
      title: t("congratulation"),
      message: t("add reward message"),
      buttons: [{ id: "ok", type: "ok" }],
    });
  };

  return showRewardPopup;
};

export default useRewardPopup;
