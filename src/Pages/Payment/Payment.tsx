import { FC } from "react";
import { useBalance } from "@/Contexts";
import { useInvoice } from "@telegram-apps/sdk-react";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useInfoPopup } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Headline } from "@telegram-apps/telegram-ui";
import { Balance, ClaimButton, BuyButton, Page } from "@/Components";
import { getInvoiceLink } from "@/helpers";
import "./styles.scss";

const Payment: FC = () => {
  const { updateBalance } = useBalance();
  const { t } = useTranslation();
  const showPopup = useInfoPopup();
  const invoice = useInvoice();
  logEvent(analytics, "page_view", { page_title: "Payment" });

  const handleMagicCoinsPurchase = async (coinsQty: number, price: number) => {
    const invoiceLink = await getInvoiceLink(
      coinsQty,
      t("magic coins"),
      t("invoice description"),
      price
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
  };

  const buttons = [
    {
      id: 0,
      title: `${t("buy")} 5 🌕 ${t("for")} ⭐100`,
      onPress: () => {
        handleMagicCoinsPurchase(5, 100);
      },
    },
    {
      id: 1,
      title: `${t("buy")} 20 🌕 ${t("for")} ⭐350`,
      onPress: () => {
        handleMagicCoinsPurchase(20, 350);
      },
    },
    {
      id: 2,
      title: `${t("buy")} 80 🌕 ${t("for")} ⭐1000`,
      onPress: () => {
        handleMagicCoinsPurchase(80, 1000);
      },
    },
  ];

  return (
    <Page>
      <div className="payment__balance">
        <Balance />
        <p>{t("magic coins")}</p>
      </div>
      <Headline weight="2" className="payment__heading">
        {t("get for free")}
      </Headline>
      <ul className="payment__buttons-list">
        <BuyButton
          title={`3 🌕 ${t("for inviting a friend")}`}
          onPress={() => {
            showPopup(t("payment popup text"));
          }}
        />
        <ClaimButton />
      </ul>
      <Headline weight="2" className="payment__heading">
        {t("buy")}
      </Headline>
      <ul className="payment__buttons-list">
        {buttons.map((button) => (
          <BuyButton
            key={button.id}
            title={button.title}
            onPress={button.onPress}
          />
        ))}
      </ul>
    </Page>
  );
};

export default Payment;
