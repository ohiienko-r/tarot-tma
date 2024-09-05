import { useCallback } from "react";
import { useBalance } from "@/Contexts";
import { useInvoice } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import useInfoPopup from "../useInfoPopup/useInfoPopup";
import { Api } from "@/Api";

const useCoinsPurchase = () => {
  const { updateBalance } = useBalance();
  const { t } = useTranslation();
  const invoice = useInvoice();
  const showPopup = useInfoPopup();

  const handleMagicCoinsPurchase = useCallback(
    async (coinsQty: number, price: number) => {
      const invoiceLink = await Api.botController.getInvoiceLink(
        t("magic coins"),
        t("invoice description"),
        price,
        coinsQty
      );

      if (invoiceLink) {
        const status = await invoice.open(invoiceLink, "url");

        if (status === "paid") {
          updateBalance(coinsQty);
          showPopup(
            `${t("purchase success")} ${coinsQty} ${t("magic coins")} 🌕`,
            t("congratulation")
          );
        } else if (status === "failed") {
          showPopup(t("purchase fail"), t("error title"));
        }
      }
    },
    [invoice, t, showPopup, updateBalance]
  );

  return handleMagicCoinsPurchase;
};

export default useCoinsPurchase;
