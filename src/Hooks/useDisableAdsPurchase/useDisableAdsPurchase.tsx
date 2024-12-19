import { useCallback } from "react";
import { invoice, popup } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useUser } from "@/Contexts";
import { setAdsDisabledTill } from "./helpers";
import { Api } from "@/Api";

const useDisableAdsPurchase = () => {
  const { user } = useUser();
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
        await setAdsDisabledTill(user?.id as number);

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
