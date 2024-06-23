import { FC, PropsWithChildren } from "react";
import "./styles.scss";

const BalancePad: FC<PropsWithChildren> = ({ children }) => {
  return <div className="balance-pad">{children}</div>;
};

export default BalancePad;
