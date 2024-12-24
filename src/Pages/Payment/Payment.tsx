import { FC, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  hapticFeedback,
  shareURL,
  popup,
  cloudStorage,
  invoice,
} from "@telegram-apps/sdk-react";
import { useUser } from "@/Contexts";
import { useBackButton, useDisableAdsPurchase } from "@/Hooks";
import { isAdsDisabled } from "@/Hooks/useAds/helpers";
import { useTranslation } from "react-i18next";
import { Button } from "@telegram-apps/telegram-ui";
import {
  Balance,
  BuyButton,
  Page,
  RateButtonWithModal,
  SupportUsButtonWithModal,
  Icons,
  Preloader,
} from "@/Components";
import { Api } from "@/Api";
import { supabase } from "@/supabase";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const shareMessage: { [key: string]: string } = {
  en: `🔮Welcome to the World of Tarot Answers🔮 \n\nAsk any question and get a clear answer in a minute. Open the door to the world of predictions`,
  ru: `🔮Приглашаю тебя в Мир ответов Таро🔮 \n\nЗадай любой вопрос и получи ясный ответ за минуту. Открой дверь в мир предсказаний`,
  uk: `🔮Запрошую тебе в Світ відповідей Таро🔮\n\nЗадай будь-яке питання та отримай чітку відповідь за хвилину. Відкрий двері у світ передбачень`,
} as const;

const Payment: FC = () => {
  const [claimButtonAvailable, setClaimButtonAvailable] = useState(false);
  const [rateButtonVisible, setRateButtonVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { user, updateBalance } = useUser();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const purchaseDisableAds = useDisableAdsPurchase();

  useEffect(() => {
    const handleRateButtonVisible = async () => {
      const rated = await cloudStorage.getItem("rated");

      if (rated == "") {
        setRateButtonVisible(true);
      } else {
        setRateButtonVisible(false);
      }
    };

    handleRateButtonVisible();
  }, []);

  useEffect(() => {
    const checkBonusAvailability = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("daily_bonus")
          .eq("id", user.id)
          .maybeSingle<{ daily_bonus: boolean }>();

        if (error) {
          popup.open({
            message:
              "Failed to retreive daily bonus status. Please contact support.",
            title: "Error!",
          });
          throw new Error(JSON.stringify(error));
        }

        if (data) {
          setClaimButtonAvailable(data?.daily_bonus);
        }
      }
    };

    checkBonusAvailability();
  });

  const handleClaimDailyBouns = async () => {
    await updateBalance(3);
    const { error } = await supabase
      .from("users")
      .update({ daily_bonus: false })
      .eq("id", user?.id);
    if (error) {
      popup.open({
        message: "Failed to update daily bonus status. Please contact support.",
        title: "Error!",
      });
      throw new Error(JSON.stringify(error));
    }
    setClaimButtonAvailable(false);
  };

  const handlePurchaseDisableAds = async () => {
    if (await isAdsDisabled()) {
      popup.open({ message: t("ads already disabled") });
    } else {
      await purchaseDisableAds();
    }
  };

  const handleNavigateHome = () => {
    hapticFeedback.impactOccurred("medium");
    navigate(ROUTES_NAMES.HOME);
  };

  useBackButton(handleNavigateHome);

  const handleMagicCoinsPurchase = useCallback(
    async (qty: number, price: number) => {
      hapticFeedback.impactOccurred("medium");

      setLoaderVisible(true);

      const invoiceLink = await Api.botController.getInvoiceLink(
        t("magic coins"),
        t("invoice description"),
        price,
        qty
      );

      if (invoiceLink) {
        const status = await invoice.open(invoiceLink, "url");

        if (status === "paid") {
          updateBalance(qty);
          popup.open({
            message: `${t("purchase success")} ${qty} ${t("magic coins")} 🌕`,
            title: t("congratulation"),
          });
        } else if (status === "failed") {
          popup.open({ message: t("purchase fail"), title: t("error title") });
        }
      }
      setLoaderVisible(false);
    },
    [t, updateBalance]
  );

  return (
    <Page className="payment">
      {loaderVisible && <Preloader />}
      <h2 className="payment__page-name">{t("shop")}</h2>
      <div className="payment__balance">
        <Balance />
      </div>
      <h2 className="payment__heading" style={{ padding: "0 1em" }}>
        {t("buy")}
      </h2>
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
          style={{ justifySelf: "center" }}
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
          style={{ justifySelf: "end" }}
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
        <BuyButton
          title={t("disable ads")}
          price={150}
          onPress={handlePurchaseDisableAds}
          className="payment__disable-ads"
        />
      </ul>
      <ul className="payment__buttons-list">
        <h2 className="payment__heading">{t("get for free")}</h2>
        <BuyButton
          onPress={() =>
            shareURL(
              `https://t.me/my_ai_tarot_bot/?startapp=${user?.id}`,
              shareMessage[i18n.language] ?? shareMessage.english
            )
          }
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "25px",
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            3<Icons.Moon size={12} />
          </div>
          <p>{t("for inviting a friend")}</p>
        </BuyButton>
        <BuyButton
          onPress={handleClaimDailyBouns}
          disabled={!claimButtonAvailable}
          className="payment__daily-bonus-button "
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "25px",
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            3<Icons.Moon size={12} />
          </div>
          <p>{t("claim daily bonus")}</p>
        </BuyButton>
        {rateButtonVisible && (
          <RateButtonWithModal onSubmit={() => setRateButtonVisible(false)} />
        )}
      </ul>
      <ul className="payment__buttons-list">
        <h2 className="payment__heading">{t("support us")}</h2>
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
