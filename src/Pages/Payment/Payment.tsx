import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { haptic } from "@/Telegram";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useInfoPopup, useBackButton, useCoinsPurchase } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Headline } from "@telegram-apps/telegram-ui";
import {
  Balance,
  ClaimButton,
  BuyButton,
  Page,
  SubmitButton,
  RateButtonWithModal,
  PurchaseDisableAdsButton,
  SupportUsButtonWithModal,
} from "@/Components";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Payment: FC = () => {
  const { t } = useTranslation();
  const purchaseCoins = useCoinsPurchase();
  const showPopup = useInfoPopup();
  const navigate = useNavigate();
  logEvent(analytics, "page_view", { page_title: "Payment" });

  const handleNavigateHome = () => {
    haptic.impactOccurred("medium");
    navigate(ROUTES_NAMES.HOME);
  };

  useBackButton(handleNavigateHome);

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
        <RateButtonWithModal />
        <ClaimButton />
      </ul>
      <Headline weight="2" className="payment__heading">
        {t("buy")}
      </Headline>
      <ul className="payment__buttons-list">
        <BuyButton
          title={`5 🌕 ${t("magic coins")} `}
          price={100}
          onPress={async () => {
            await purchaseCoins(5, 100);
          }}
        />
        <BuyButton
          title={`20 🌕 ${t("magic coins")} `}
          price={350}
          caption={t("economy 13")}
          onPress={async () => {
            await purchaseCoins(20, 350);
          }}
        />
        <BuyButton
          title={`80 🌕 ${t("magic coins")} `}
          price={1000}
          caption={t("economy 38")}
          onPress={async () => {
            await purchaseCoins(80, 1000);
          }}
        />
      </ul>
      <Headline weight="2" className="payment__heading">
        {t("disable ads")}
      </Headline>
      <ul className="payment__buttons-list">
        <PurchaseDisableAdsButton />
        <SupportUsButtonWithModal />
      </ul>
      <div className="payment__home">
        <SubmitButton title={t("to home")} onPress={handleNavigateHome} />
      </div>
    </Page>
  );
};

export default Payment;
