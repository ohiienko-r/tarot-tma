import { FC } from "react";
import { useTranslation } from "react-i18next";
import { popup } from "@telegram-apps/sdk-react";
import { useDisableAdsPurchase } from "@/Hooks";
import { BuyButton } from "@/Components";
import { isAdsDisabled } from "@/Hooks/useAds/helpers";
import "./styles.scss";

const PurchaseDisableAdsButton: FC = () => {
  const { t } = useTranslation();
  const purchaseDisableAds = useDisableAdsPurchase();

  const handleClick = async () => {
    if (await isAdsDisabled()) {
      popup.open({ message: t("ads already disabled") });
    } else {
      await purchaseDisableAds();
    }
  };

  return (
    <BuyButton
      title={`${t("disable ads")} ${t("for 30 days")}`}
      price={150}
      onPress={handleClick}
      className="disable-ads-button"
    />
  );
};

export default PurchaseDisableAdsButton;
