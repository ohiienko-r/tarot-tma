import { useCallback } from "react";
import { invoice, popup } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { Api } from "@/Api";

const useSupportUs = () => {
  const { t } = useTranslation();

  const handleDonation = useCallback(
    async (amount: number, onComplete?: () => void) => {
      const invoiceLink = await Api.botController.getInvoiceLink(
        t("support the developers"),
        t("support the developers"),
        amount
      );

      if (invoiceLink) {
        const status = await invoice.open(invoiceLink, "url");

        if (status === "paid") {
          popup.open({ message: t("we appreciate"), title: t("thank you") });
        } else if (status === "failed") {
          popup.open({ message: t("purchase fail"), title: t("error title") });
        }
      }

      onComplete && onComplete();
    },
    [t]
  );

  return handleDonation;
};

export default useSupportUs;
