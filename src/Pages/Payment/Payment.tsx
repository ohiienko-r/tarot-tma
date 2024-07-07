import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Headline } from "@telegram-apps/telegram-ui";
import { Balance, ClaimButton, BuyButton } from "@/Components";
import "./styles.scss";

const Payment: FC = () => {
  const { t } = useTranslation();

  const buttons = [
    { id: 0, title: `${t("buy")} 5 🌕 ${t("for")} $1.99`, onPress: () => {} },
    { id: 1, title: `${t("buy")} 20 🌕 ${t("for")} $4.99`, onPress: () => {} },
    {
      id: 2,
      title: `${t("buy")} 100 🌕 ${t("for")} $19.99`,
      onPress: () => {},
    },
  ];
  return (
    <>
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
          onPress={() => {}}
          disabled
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
            disabled={true}
          />
        ))}
      </ul>
    </>
  );
};

export default Payment;
