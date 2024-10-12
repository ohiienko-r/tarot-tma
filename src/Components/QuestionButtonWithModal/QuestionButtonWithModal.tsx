import { FC, useState } from "react";
import { haptic } from "@/Telegram";
import { useUser } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { Icons, Modal } from "@/Components";
import { Button, IconButton, Text } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const QuestionButtonWithModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { balance } = useUser();
  const { t } = useTranslation();

  const handleModalOpen = () => {
    haptic.impactOccurred("medium");
    setModalVisible(true);
  };

  const handleModalClose = () => {
    haptic.impactOccurred("medium");
    setModalVisible(false);
  };

  const title = `${t("balance description pt1")} ${balance} 🌕 ${t(
    "magic coins"
  )}.`;

  return (
    <>
      <IconButton
        size="s"
        mode="plain"
        onClick={handleModalOpen}
        className="question-button"
      >
        <Icons.QuestionMark />
      </IconButton>
      <Modal.MinContent
        open={modalVisible}
        onClose={handleModalClose}
        title={title}
      >
        <Text Component={"p"}>{t("balance description pt2")}</Text>
        <Button size="l" stretched onClick={handleModalClose}>
          {t("got it")}
        </Button>
      </Modal.MinContent>
    </>
  );
};

export default QuestionButtonWithModal;
