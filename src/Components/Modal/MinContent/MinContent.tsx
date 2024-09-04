import { FC } from "react";
import { Modal, IconButton, Headline } from "@telegram-apps/telegram-ui";
import { Icons } from "@/Components";
import { ModalPropTypes } from "../types";
import "./styles.scss";

const MinContent: FC<ModalPropTypes> = ({ open, onClose, children, title }) => {
  return (
    <Modal
      open={open}
      dismissible={false}
      className="modal__min-content"
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
      <div className="modal__min-content--container">
        {title && (
          <Headline weight="2" className="modal__min-content--heading">
            {title}
          </Headline>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default MinContent;
