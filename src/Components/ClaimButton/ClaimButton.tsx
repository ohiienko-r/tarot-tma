import { FC, useState, useEffect } from "react";
import { useUser } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { cloudStorage } from "@/Telegram";
import { BuyButton } from "@/Components";
import "./styles.scss";

const ClaimButton: FC = () => {
  const [disabled, setDisabled] = useState(true);
  const { updateBalance } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    const handleButtonAvailability = async () => {
      const isBonusClaimed = await cloudStorage.get("bonusClaimed");

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
    await cloudStorage.set("bonusClaimed", JSON.stringify(true));
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
