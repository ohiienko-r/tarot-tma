import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "@/Contexts";
import { useInvoice } from "@telegram-apps/sdk-react";
import { cloudStorage, haptic } from "@/Telegram";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useInfoPopup, useBackButton } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Headline } from "@telegram-apps/telegram-ui";
import {
  Balance,
  ClaimButton,
  BuyButton,
  Page,
  SubmitButton,
  RatingModal,
} from "@/Components";
import { getInvoiceLink } from "@/helpers";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Payment: FC = () => {
  const [ratingModalVisible, setRatingModalVisible] = useState<boolean>(false);
  const [ratingButtonAvailable, setRatingButtonAvailable] =
    useState<boolean>(false);
  const { updateBalance } = useBalance();
  const { t } = useTranslation();
  const showPopup = useInfoPopup();
  const invoice = useInvoice();
  const navigate = useNavigate();
  logEvent(analytics, "page_view", { page_title: "Payment" });

  const handleNavigateHome = () => {
    haptic.impactOccurred("medium");
    navigate(ROUTES_NAMES.HOME);
  };

  useBackButton(handleNavigateHome);

  const handleMagicCoinsPurchase = async (coinsQty: number, price: number) => {
    const invoiceLink = await getInvoiceLink(
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
  };

  const handleDisableAdsPurchase = async () => {
    const invoiceLink = await getInvoiceLink(
      t("disabling ads"),
      t("disabling ads"),
      150
    );

    if (invoiceLink) {
      const status = await invoice.open(invoiceLink, "url");
      if (status === "paid") {
        showPopup(
          `${t("purchase success")} ${t("disabling ads")}`,
          t("congratulation")
        );
      } else if (status === "failed") {
        showPopup(t("purchase fail"), t("error title"));
      }
    }
  };

  const handleRatingModalOpen = () => {
    setRatingModalVisible(true);
  };

  const handleRatingModalClose = () => {
    haptic.impactOccurred("medium");
    setRatingModalVisible(false);
  };

  useEffect(() => {
    const handleRatingButtonAvailable = async () => {
      const rated = await cloudStorage.get("rated");

      if (rated == "") {
        setRatingButtonAvailable(true);
      } else {
        setRatingButtonAvailable(false);
      }
    };

    handleRatingButtonAvailable();
  });

  const buttons = [
    {
      id: 0,
      title: `${t("buy")} 5 🌕`,
      price: 100,
      onPress: () => {
        handleMagicCoinsPurchase(5, 100);
      },
    },
    {
      id: 1,
      title: `${t("buy")} 20 🌕`,
      price: 350,
      caption: t("economy 13"),
      onPress: () => {
        handleMagicCoinsPurchase(20, 350);
      },
    },
    {
      id: 2,
      title: `${t("buy")} 80 🌕`,
      price: 1000,
      caption: t("economy 38"),
      onPress: () => {
        handleMagicCoinsPurchase(80, 1000);
      },
    },
  ];

  return (
    <Page className="payment">
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
        {ratingButtonAvailable && (
          <BuyButton
            title={`3 🌕 ${t("for rating us")}`}
            onPress={handleRatingModalOpen}
          />
        )}
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
            price={button.price}
            caption={button.caption}
            onPress={button.onPress}
          />
        ))}
      </ul>
      <Headline weight="2" className="payment__heading">
        {t("disable ads")}
      </Headline>
      <ul className="payment__buttons-list">
        <BuyButton
          title={t("for 30 days")}
          price={150}
          onPress={handleDisableAdsPurchase}
        />
      </ul>
      <div className="payment__home">
        <SubmitButton title={t("to home")} onPress={handleNavigateHome} />
      </div>
      <RatingModal open={ratingModalVisible} onClose={handleRatingModalClose} />
    </Page>
  );
};

export default Payment;
