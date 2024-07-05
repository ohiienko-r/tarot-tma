import { FC } from "react";
import { useBalance } from "@/Contexts";
import { useHapticFeedback } from "@tma.js/sdk-react";
import {
  Modal,
  Button,
  IconButton,
  Text,
  Headline,
} from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import questionMark from "@/assets/plain_question_mark.svg";
import "./styles.scss";

const BalanceCaption: FC = () => {
  const { balance } = useBalance();
  const { t } = useTranslation();
  const haptic = useHapticFeedback();

  const handleInfoPress = () => {
    haptic.impactOccurred("medium");
  };

  const modalTextPtOne = `${t("balance description pt1")} ${balance} 🌕 ${t(
    "magic coins"
  )}.`;

  const modalTextPtTwo = t("balance description pt2");

  return (
    <div className="balance-caption">
      <p className="balance-caption__currency-name">{t("magic coins")}</p>
      <Modal
        header={<Modal.Header />}
        trigger={
          <IconButton size="s" mode="plain" onClick={handleInfoPress}>
            <img
              src={questionMark}
              className="balance-caption__question-mark"
              alt="Question mark"
            />
          </IconButton>
        }
        className="drawer-modal"
      >
        <div>
          <Headline weight="2" className="balance-caption__modal-text">
            {modalTextPtOne}
          </Headline>
          <Text Component={"p"} className="balance-caption__modal-text">
            {modalTextPtTwo}
          </Text>
          <Modal.Close>
            <Button mode="gray" size="l" stretched>
              {t("got it")}
            </Button>
          </Modal.Close>
        </div>
      </Modal>
    </div>
  );
};

export default BalanceCaption;
