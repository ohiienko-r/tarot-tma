import { FC } from "react";
import { Modal } from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import { BalanceCaptionPropTypes } from "./types";
import questionMark from "@/assets/plain_question_mark.svg";
import "./styles.scss";

const BalanceCaption: FC<BalanceCaptionPropTypes> = ({ balance }) => {
  const { t } = useTranslation();

  const modalTextPtOne = `${t("balance description pt1")} ${balance} ${t(
    "magic coins"
  )} 🌕.`;

  const modalTextPtTwo = t("balance description pt2");

  return (
    <div className="balance-caption">
      <p className="balance-caption__currency-name">{t("magic coins")}</p>
      <Modal
        header={<Modal.Header />}
        trigger={
          <img src={questionMark} className="balance-caption__question-mark" />
        }
        className="drawer-modal"
      >
        <p className="balance-caption__modal-text">{modalTextPtOne}</p>
        <p className="balance-caption__modal-text">{modalTextPtTwo}</p>
      </Modal>
    </div>
  );
};

export default BalanceCaption;
