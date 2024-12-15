import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hapticFeedback, shareURL } from "@telegram-apps/sdk-react";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { useUser } from "@/Contexts";
import { useBackButton, useCoinsPurchase } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Button } from "@telegram-apps/telegram-ui";
import {
  Balance,
  ClaimButton,
  BuyButton,
  Page,
  RateButtonWithModal,
  PurchaseDisableAdsButton,
  SupportUsButtonWithModal,
  Icons,
  Preloader,
} from "@/Components";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const shareMessage: { [key: string]: string } = {
  en: `🔮Welcome to the World of Tarot Answers🔮 \n\nAsk any question and get a clear answer in a minute. Open the door to the world of predictions`,
  ru: `🔮Приглашаю тебя в Мир ответов Таро🔮 \n\nЗадай любой вопрос и получи ясный ответ за минуту. Открой дверь в мир предсказаний`,
  uk: `🔮Запрошую тебе в Світ відповідей Таро🔮\n\nЗадай будь-яке питання та отримай чітку відповідь за хвилину. Відкрий двері у світ передбачень`,
} as const;

const Payment: FC = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);
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

  const handleMagicCoinsPurchase = async (qty: number, price: number) => {
    hapticFeedback.impactOccurred("medium");
    setLoaderVisible(true);
    await purchaseCoins(qty, price);
    setLoaderVisible(false);
  };

  return (
    <Page className="payment">
      {loaderVisible && <Preloader />}
      <h2 className="payment__page-name">{t("shop")}</h2>
      <div className="payment__balance">
        <Balance />
      </div>
      <h2 className="payment__heading">{t("buy")}</h2>
      <ul className="payment__buttons-inline-list">
        <button
          className="payment__cta-button"
          onClick={() => handleMagicCoinsPurchase(5, 100)}
        >
          <div className="payment__cta-button-title">
            5 <Icons.Moon />
          </div>
          <div className="payment__cta-button-price">
            <Icons.TelegramStar />
            100
          </div>
          <div
            className="payment__cta-button-discount"
            style={{ visibility: "hidden" }}
          ></div>
        </button>
        <button
          className="payment__cta-button"
          onClick={() => handleMagicCoinsPurchase(20, 350)}
        >
          <div className="payment__cta-button-title">
            20 <Icons.Moon />
          </div>
          <div className="payment__cta-button-price">
            <Icons.TelegramStar />
            350
          </div>
          <div className="payment__cta-button-discount"> {t("economy 13")}</div>
        </button>
        <button
          className="payment__cta-button"
          onClick={() => handleMagicCoinsPurchase(80, 1200)}
        >
          <div className="payment__cta-button-title">
            80 <Icons.Moon />
          </div>
          <div className="payment__cta-button-price">
            <Icons.TelegramStar />
            1200
          </div>
          <div className="payment__cta-button-discount"> {t("economy 38")}</div>
        </button>
      </ul>
      <ul className="payment__buttons-list">
        <PurchaseDisableAdsButton />
      </ul>
      <h2 className="payment__heading">{t("get for free")}</h2>
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
      <h2 className="payment__heading">{t("support us")}</h2>
      <ul className="payment__buttons-list">
        <SupportUsButtonWithModal />
      </ul>
      <div className="payment__home">
        <Button
          size="l"
          stretched
          onClick={handleNavigateHome}
          style={{ backgroundColor: "#EA850F" }}
        >
          {t("to home")}
        </Button>
      </div>
    </Page>
  );
};

export default Payment;
