import { useCallback } from "react";
import { useInvoice } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { initData } from "@/Telegram";
import useInfoPopup from "../useInfoPopup/useInfoPopup";
import { Api } from "@/Api";

const useDisableAdsPurchase = () => {
  const { t } = useTranslation();
  const invoice = useInvoice();
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
        const uId = initData?.user?.id;

        await Api.adsController.setAdsDisabledTill(uId as number);

        showPopup(
          `${t("purchase success")} ${t("disabling ads")}`,
          t("congratulation")
        );
      } else if (status === "failed") {
        showPopup(t("purchase fail"), t("error title"));
      }
    }
  }, [invoice, t, showPopup]);

  return handleDisableAdsPurchase;
};

export default useDisableAdsPurchase;
