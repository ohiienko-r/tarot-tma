import { FC, useState, useEffect } from "react";
import { BuyButton, RatingModal } from "@/Components";
import { haptic, cloudStorage } from "@/Telegram";
import { useTranslation } from "react-i18next";

const RateButtonWithModal: FC = () => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleButtonVisible = async () => {
      const rated = await cloudStorage.get("rated");

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
    haptic.impactOccurred("medium");
    setModalVisible(false);
  };

  return (
    <>
      {buttonVisible && (
        <>
          <BuyButton
            title={`3 🌕 ${t("for rating us")}`}
            onPress={handleModalOpen}
          />
          <RatingModal open={modalVisible} onClose={handleModalClose} />
        </>
      )}
    </>
  );
};

export default RateButtonWithModal;
