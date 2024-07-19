import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Headline } from "@telegram-apps/telegram-ui";
import { Balance, ClaimButton, BuyButton, Page } from "@/Components";
import { useInfoPopup } from "@/Hooks";
import "./styles.scss";

const Payment: FC = () => {
  const { t } = useTranslation();
  const showPopup = useInfoPopup();

  const buttons = [
    {
      id: 0,
      title: `${t("buy")} 5 🌕 ${t("for")} ⭐100`,
      onPress: () => {
        showPopup(t("payment popup text"));
      },
    },
    {
      id: 1,
      title: `${t("buy")} 20 🌕 ${t("for")} ⭐350`,
      onPress: () => {
        showPopup(t("payment popup text"));
      },
    },
    {
      id: 2,
      title: `${t("buy")} 80 🌕 ${t("for")} ⭐1000`,
      onPress: () => {
        showPopup(t("payment popup text"));
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
