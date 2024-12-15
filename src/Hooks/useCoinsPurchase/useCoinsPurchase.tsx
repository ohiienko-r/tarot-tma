import { useCallback } from "react";
import { useUser } from "@/Contexts";
import { invoice, popup } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { Api } from "@/Api";

const useCoinsPurchase = () => {
  const { updateBalance } = useUser();
  const { t } = useTranslation();

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
          popup.open({
            message: `${t("purchase success")} ${coinsQty} ${t(
              "magic coins"
            )} 🌕`,
            title: t("congratulation"),
          });
        } else if (status === "failed") {
          popup.open({ message: t("purchase fail"), title: t("error title") });
        }
      }
    },
    [t, updateBalance]
  );

  return handleMagicCoinsPurchase;
};

export default useCoinsPurchase;
