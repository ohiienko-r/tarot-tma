import { useCallback } from "react";
import { useInvoice } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import useInfoPopup from "../useInfoPopup/useInfoPopup";
import { getInvoiceLink } from "@/helpers";

const useSupportUs = () => {
  const { t } = useTranslation();
  const invoice = useInvoice();
  const showPopup = useInfoPopup();

  const handleDonation = useCallback(
    async (amount: number, onComplete?: () => void) => {
      const invoiceLink = await getInvoiceLink(
        t("support the developers"),
        t("support the developers"),
        amount
      );

      if (invoiceLink) {
        const status = await invoice.open(invoiceLink, "url");

        if (status === "paid") {
          showPopup(t("we appreciate"), t("thank you"));
        } else if (status === "failed") {
          showPopup(t("purchase fail"), t("error title"));
        }
      }

      onComplete && onComplete();
    },
    [invoice, t, showPopup]
  );

  return handleDonation;
};

export default useSupportUs;
