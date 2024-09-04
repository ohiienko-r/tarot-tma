import { FC } from "react";
import { Modal, IconButton, Headline } from "@telegram-apps/telegram-ui";
import { Icons } from "@/Components";
import { ModalPropTypes } from "../types";
import "./styles.scss";

const FullScreen: FC<ModalPropTypes> = ({ open, onClose, children, title }) => {
  return (
    <Modal
      open={open}
      dismissible={false}
      className="modal__full-screen"
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
      {title && (
        <Headline weight="2" className="modal__full-screen--heading">
          {title}
        </Headline>
      )}
      {children}
    </Modal>
  );
};

export default FullScreen;
