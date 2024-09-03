import { ReactNode } from "react";

export type ModalPropTypes = {
  open: boolean;
  onClose: () => void | Promise<void>;
  children: ReactNode;
  title?: string;
};
