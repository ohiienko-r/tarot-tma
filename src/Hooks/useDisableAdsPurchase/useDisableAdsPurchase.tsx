import { useCallback } from "react";
import { invoice } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { initData } from "@telegram-apps/sdk-react";
import useInfoPopup from "../useInfoPopup/useInfoPopup";
import { Api } from "@/Api";

const useDisableAdsPurchase = () => {
  const user = initData.user();
  const { t } = useTranslation();
  const showPopup = useInfoPopup();

  const handleDisableAdsPurchase = useCallback(async () => {
    const invoiceLink = await Api.botController.getInvoiceLink(
      t("disabling ads"),
      t("disabling ads"),
      150
    );

    if (invoiceLink) {
      const status = await invoice.open(invoiceLink, "url");
      if (status === "paid") {
        await Api.adsController.setAdsDisabledTill(user?.id as number);

        showPopup(
          `${t("purchase success")} ${t("disabling ads")}`,
          t("congratulation")
        );
      } else if (status === "failed") {
        showPopup(t("purchase fail"), t("error title"));
      }
    }
  }, [t, showPopup]);

  return handleDisableAdsPurchase;
};

export default useDisableAdsPurchase;
