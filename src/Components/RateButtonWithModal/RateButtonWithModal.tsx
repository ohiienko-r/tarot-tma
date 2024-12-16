import { FC, useState, useEffect } from "react";
import { BuyButton, RatingModal, Icons } from "@/Components";
import { hapticFeedback, cloudStorage } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const RateButtonWithModal: FC = () => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleButtonVisible = async () => {
      const rated = await cloudStorage.getItem("rated");

      if (rated == "") {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    };

    handleButtonVisible();
  });

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    hapticFeedback.impactOccurred("medium");
    setModalVisible(false);
  };

  return (
    <>
      {buttonVisible && (
        <>
          <BuyButton onPress={handleModalOpen}>
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
            <p>{t("for rating us")}</p>
          </BuyButton>
          <RatingModal open={modalVisible} onClose={handleModalClose} />
        </>
      )}
    </>
  );
};

export default RateButtonWithModal;
