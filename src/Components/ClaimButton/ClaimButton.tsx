import { FC, useState, useEffect } from "react";
import { useUser } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { BuyButton, Icons } from "@/Components";
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
      onPress={handleClick}
      disabled={disabled}
      className="claim-button"
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
  );
};

export default ClaimButton;
