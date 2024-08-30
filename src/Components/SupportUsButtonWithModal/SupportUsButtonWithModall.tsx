import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { haptic } from "@/Telegram";
import { BuyButton, Icons } from "@/Components";
import { Modal, Headline, IconButton } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const SupportUsButtonWithModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const hanldeModalClose = () => {
    haptic.impactOccurred("medium");
    setModalVisible(false);
  };

  return (
    <>
      <BuyButton title={t("support us")} onPress={handleModalOpen} />
      <Modal
        dismissible={false}
        open={modalVisible}
        header={
          <Modal.Header
            after={
              <IconButton mode="plain" size="m" onClick={hanldeModalClose}>
                <Icons.Close />
              </IconButton>
            }
          />
        }
      >
        <Headline weight="2" className="rating-modal__heading">
          {t("support us")}
        </Headline>
      </Modal>
    </>
  );
};

export default SupportUsButtonWithModal;
