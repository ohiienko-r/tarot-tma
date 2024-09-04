import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { haptic } from "@/Telegram";
import { Modal, BuyButton } from "..";
import { Text, Button, Headline, List } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const RegisterAtProductHuntButtonWithModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    haptic.impactOccurred("medium");
    setModalVisible(false);
  };

  return (
    <>
      <BuyButton
        title="3 for registration at Product Hunt"
        onPress={handleModalOpen}
      />
      <Modal.FullScreen open={modalVisible} onClose={handleModalClose}>
        <Headline weight="2">{t("we need your help")}</Headline>
        <Text Component={"p"}>{t("help abstract")}</Text>
        <Headline weight="2">{t("how can you help")}</Headline>
        <List Component={"ol"} className="register__ordered-list">
          <Text Component={"li"}>{t("step 1")}</Text>
          <Text Component={"li"}>{t("step 2")}</Text>
          <Text Component={"li"}>{t("step 3")}</Text>
          <Text Component={"li"}>{t("step 4")}</Text>
        </List>
        <Button size="l" onClick={handleModalClose} stretched>
          Submit your registration
        </Button>
      </Modal.FullScreen>
    </>
  );
};

export default RegisterAtProductHuntButtonWithModal;
