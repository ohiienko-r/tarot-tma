import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useInfoPopup, useDisableAdsPurchase } from "@/Hooks";
import { BuyButton } from "@/Components";
import { isAdsDisabled } from "@/Hooks/useAds/helpers";

const PurchaseDisableAdsButton: FC = () => {
  const { t } = useTranslation();
  const showPopup = useInfoPopup();
  const purchaseDisableAds = useDisableAdsPurchase();

  const handleClick = async () => {
    if (await isAdsDisabled()) {
      showPopup("You have already bought 'Відключення реклами'");
    } else {
      await purchaseDisableAds();
    }
  };

  return (
    <BuyButton title={t("for 30 days")} price={150} onPress={handleClick} />
  );
};

export default PurchaseDisableAdsButton;
