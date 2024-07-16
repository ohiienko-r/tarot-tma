import { FC, useState } from "react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { useBalance } from "@/Contexts";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Button,
  IconButton,
  Text,
  Headline,
} from "@telegram-apps/telegram-ui";
import questionMark from "@/assets/plain_question_mark.svg";

const QuestionButtonWithModal: FC = () => {
  const [modalVisible, setModalvisible] = useState<boolean>(false);
  const { balance } = useBalance();
  const { t } = useTranslation();
  const haptic = useHapticFeedback();

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
      <IconButton size="s" mode="plain" onClick={handleModalOpen}>
        <img src={questionMark} alt="Question mark" />
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
