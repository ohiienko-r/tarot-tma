import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { haptic } from "@/Telegram";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useBackButton, useCoinsPurchase, useShareApp } from "@/Hooks";
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
import VerticalBuyButton from "@/Components/VerticalBuyButton/VerticalBuyButton";

const Payment: FC = () => {
  const { t } = useTranslation();
  const purchaseCoins = useCoinsPurchase();
  const navigate = useNavigate();
  const shareApp = useShareApp();
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
        {t("discount month")}
      </Headline>
      <ul className="payment__buttons-inline-list">
        <VerticalBuyButton
          title={`5🌕`}
          price={50}
          caption="⭐100"
          onPress={async () => {
            await purchaseCoins(5, 50);
          }}
        />
        <VerticalBuyButton
          title={`20🌕`}
          price={175}
          caption="⭐400"
          onPress={async () => {
            await purchaseCoins(20, 175);
          }}
        />
        <VerticalBuyButton
          title={`80🌕`}
          price={600}
          caption="⭐1350"
          onPress={async () => {
            await purchaseCoins(80, 600);
          }}
        />
      </ul>
      <ul className="payment__buttons-list">
        <PurchaseDisableAdsButton />
      </ul>
      <Headline weight="2" className="payment__heading">
        {`${t("get for free")} 🎁`}
      </Headline>
      <ul className="payment__buttons-list">
        <BuyButton
          title={`3 🌕 ${t("for inviting a friend")}`}
          onPress={shareApp}
        />
        <ClaimButton />
        <RateButtonWithModal />
      </ul>
      <Headline weight="2" className="payment__heading">
        {`${t("support us")} ❤️`}
      </Headline>
      <ul className="payment__buttons-list">
        <SupportUsButtonWithModal />
      </ul>
      <div className="payment__home">
        <SubmitButton title={t("to home")} onPress={handleNavigateHome} />
      </div>
    </Page>
  );
};

export default Payment;
