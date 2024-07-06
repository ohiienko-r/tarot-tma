import { FC, useState } from "react";
import { useBalance } from "@/Contexts";
import { useRewardPopup } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Button, Headline } from "@telegram-apps/telegram-ui";
import { Balance } from "@/Components";
import { AdController } from "@/AdsGram/controller";
import { validateInitData } from "@/helpers";
import chevron from "@/assets/chevron_right_16.svg";
import "./styles.scss";

const Payment: FC = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { t } = useTranslation();
  const { updateBalance } = useBalance();
  const showRewardPopup = useRewardPopup();

  const handleShowAd = async () => {
    setLoaderVisible(true);
    if (await validateInitData()) {
      console.log("Data valid");
      AdController.show()
        .then(() => {
          updateBalance(1);
          showRewardPopup();
        })
        .catch(() => {
          console.log("Closed add to early");
        });
    }
    setLoaderVisible(false);
  };

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
        <Button
          onClick={handleShowAd}
          loading={loaderVisible}
          disabled={loaderVisible}
          mode="gray"
          size="m"
          stretched
          after={<img src={chevron} alt="Chevron" />}
        >
          <p className="payment__buton-title">{`1 🌕 ${t(
            "for watching add"
          )}`}</p>
        </Button>
      </ul>
      <Headline weight="2" className="payment__heading">
        {t("buy")}
      </Headline>
      <ul className="payment__buttons-list">
        {buttons.map((button) => (
          <Button
            key={button.id}
            onClick={button.onPress}
            mode="gray"
            size="m"
            stretched
            after={<img src={chevron} alt="Chevron" />}
            disabled={true}
          >
            <p className="payment__buton-title">{button.title}</p>
          </Button>
        ))}
      </ul>
    </>
  );
};

export default Payment;
