import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { hapticFeedback, shareURL } from "@telegram-apps/sdk-react";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useUser } from "@/Contexts";
import { useBackButton, useCoinsPurchase } from "@/Hooks";
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

const shareMessage: { [key: string]: string } = {
  en: `🔮Welcome to the World of Tarot Answers🔮 \n\nAsk any question and get a clear answer in a minute. Open the door to the world of predictions`,
  ru: `🔮Приглашаю тебя в Мир ответов Таро🔮 \n\nЗадай любой вопрос и получи ясный ответ за минуту. Открой дверь в мир предсказаний`,
  uk: `🔮Запрошую тебе в Світ відповідей Таро🔮\n\nЗадай будь-яке питання та отримай чітку відповідь за хвилину. Відкрий двері у світ передбачень`,
} as const;

const Payment: FC = () => {
  const { user } = useUser();
  const { t, i18n } = useTranslation();
  const purchaseCoins = useCoinsPurchase();
  const navigate = useNavigate();

  logEvent(analytics, "page_view", { page_title: "Payment" });

  const handleNavigateHome = () => {
    hapticFeedback.impactOccurred("medium");
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
          onPress={() =>
            shareURL(
              `https://t.me/my_ai_tarot_bot/?startapp=${user?.uId}`,
              shareMessage[i18n.language] ?? shareMessage.english
            )
          }
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
