import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackForm, Icons } from "@/Components";
import { Modal, IconButton, Headline } from "@telegram-apps/telegram-ui";
import { RatingModalPropTypes } from "./types";
import "./styles.scss";

const RatingModal: FC<RatingModalPropTypes> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      className="rating-modal"
      dismissible={false}
      open={open}
      header={
        <Modal.Header
          after={
            <IconButton mode="plain" size="m" onClick={onClose}>
              <Icons.Close />
            </IconButton>
          }
        />
      }
    >
      <Headline weight="2" className="rating-modal__heading">
        {t("rate us")}
      </Headline>
      <FeedbackForm onClose={onClose} />
    </Modal>
  );
};

export default RatingModal;
