import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { BuyButton, SupportUsForm, Modal } from "@/Components";

const SupportUsButtonWithModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const hanldeModalClose = () => {
    hapticFeedback.impactOccurred("medium");
    setModalVisible(false);
  };

  return (
    <>
      <BuyButton onPress={handleModalOpen} price={" "}>
        <p>{t("with telegram stars")}</p>
      </BuyButton>
      <Modal.FullScreen
        open={modalVisible}
        onClose={hanldeModalClose}
        title={t("support us")}
      >
        <SupportUsForm onComplete={hanldeModalClose} />
      </Modal.FullScreen>
    </>
  );
};

export default SupportUsButtonWithModal;
