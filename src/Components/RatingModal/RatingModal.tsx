import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackForm, Modal } from "@/Components";
import { RatingModalPropTypes } from "./types";

const RatingModal: FC<RatingModalPropTypes> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal.FullScreen open={open} onClose={onClose} title={t("rate us")}>
      <FeedbackForm onClose={onClose} />
    </Modal.FullScreen>
  );
};

export default RatingModal;
