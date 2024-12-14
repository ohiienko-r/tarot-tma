import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  hapticFeedback,
  openLink,
  openTelegramLink,
} from "@telegram-apps/sdk-react";
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
    hapticFeedback.impactOccurred("medium");
    setModalVisible(false);
  };

  const handleOpenPh = () => {
    hapticFeedback.impactOccurred("medium");
    openLink("https://www.producthunt.com/");
  };

  const handleOpenSupportChat = () => {
    openTelegramLink("https://t.me/trlgst");
    handleModalClose();
  };

  return (
    <>
      <BuyButton
        title={`10 🌕 ${t("for registration at ph heading")}`}
        onPress={handleModalOpen}
      />
      <Modal.FullScreen open={modalVisible} onClose={handleModalClose}>
        <Headline weight="2" Component={"h3"}>
          {t("we need your help")}
        </Headline>
        <Text Component={"p"}>{t("help abstract")}</Text>
        <Headline weight="2" Component={"h3"}>
          {t("how can you help")}
        </Headline>
        <List Component={"ol"} className="register__ordered-list">
          <Text Component={"li"}>{t("step 1")}</Text>
          <Text Component={"li"}>{t("step 2")}</Text>
          <Text Component={"li"}>{t("step 3")}</Text>
          <Text Component={"li"}>{t("step 4")}</Text>
        </List>
        <Headline weight="3" Component={"h3"} style={{ marginBottom: "0.5em" }}>
          {t("you will get coins")}
        </Headline>
        <Headline weight="2" Component={"h3"}>
          {t("why is it necessary")}
        </Headline>
        <List Component={"ul"} className="register__unordered-list">
          <Text Component={"li"}>{t("point 1")}</Text>
          <Text Component={"li"}>{t("point 2")}</Text>
        </List>
        <Headline weight="2" Component={"h3"}>
          {t("whats next")}
        </Headline>
        <List Component={"ul"} className="register__unordered-list">
          <Text Component={"li"}>{t("whats next point")}</Text>
        </List>
        <Text Component={"p"}>{t("thank you for your support")}</Text>
        <Text Component={"p"} style={{ margin: "0.5em 0 0.5em 0" }}>
          <i>{t("note")}</i>
        </Text>
        <div className="register__buttons">
          <Button mode="bezeled" size="l" onClick={handleOpenPh} stretched>
            {t("open ph")}
          </Button>
          <Button size="l" onClick={handleOpenSupportChat} stretched>
            {t("send")}
          </Button>
        </div>
      </Modal.FullScreen>
    </>
  );
};

export default RegisterAtProductHuntButtonWithModal;
