import { FC, useState, useEffect } from "react";
import { useUser } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { BuyButton } from "@/Components";
import "./styles.scss";

const ClaimButton: FC = () => {
  const [disabled, setDisabled] = useState(true);
  const { updateBalance } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    const handleButtonAvailability = async () => {
      const isBonusClaimed = await cloudStorage.getItem("bonusClaimed");
      console.log(isBonusClaimed);

      if (JSON.parse(isBonusClaimed)) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };

    handleButtonAvailability();
  });

  const handleClick = async () => {
    await updateBalance(3);
    await cloudStorage.setItem("bonusClaimed", JSON.stringify(true));
    setDisabled(true);
  };

  return (
    <BuyButton
      title={t("claim daily bonus")}
      onPress={handleClick}
      disabled={disabled}
      className="claim-button"
    />
  );
};

export default ClaimButton;
