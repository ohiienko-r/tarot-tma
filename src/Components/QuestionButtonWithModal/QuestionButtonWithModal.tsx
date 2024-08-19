import { FC, useState } from "react";
import { haptic } from "@/Telegram";
import { useBalance } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { Icons } from "@/Components";
import {
  Modal,
  Button,
  IconButton,
  Text,
  Headline,
} from "@telegram-apps/telegram-ui";
import "./styles.scss";

const QuestionButtonWithModal: FC = () => {
  const [modalVisible, setModalvisible] = useState<boolean>(false);
  const { balance } = useBalance();
  const { t } = useTranslation();

  const handleModalOpen = () => {
    haptic.impactOccurred("medium");
    setModalvisible(true);
  };

  const handleModalClose = () => {
    haptic.impactOccurred("medium");
    setModalvisible(false);
  };

  const modalTextPtOne = `${t("balance description pt1")} ${balance} 🌕 ${t(
    "magic coins"
  )}.`;

  const modalTextPtTwo = t("balance description pt2");

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
      <Modal
        open={modalVisible}
        dismissible={false}
        header={<Modal.Header />}
        className="drawer-modal"
      >
        <div>
          <Headline weight="2">{modalTextPtOne}</Headline>
          <Text Component={"p"}>{modalTextPtTwo}</Text>
          <Button mode="gray" size="l" stretched onClick={handleModalClose}>
            {t("got it")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default QuestionButtonWithModal;
