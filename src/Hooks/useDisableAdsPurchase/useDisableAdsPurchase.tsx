import { useCallback } from "react";
import { initData, invoice, popup } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { Api } from "@/Api";

const useDisableAdsPurchase = () => {
  const user = initData.user();
  const { t } = useTranslation();

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

        popup.open({
          message: `${t("purchase success")} ${t("disabling ads")}`,
          title: t("congratulation"),
        });
      } else if (status === "failed") {
        popup.open({ message: t("purchase fail"), title: t("error title") });
      }
    }
  }, [user?.id, t]);

  return handleDisableAdsPurchase;
};

export default useDisableAdsPurchase;
