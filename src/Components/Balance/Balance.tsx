import { FC } from "react";
import { useBalance } from "@/Contexts";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <div className="balance__value">
      {balance}
      <span>🌕</span>
    </div>
  );
};

export default Balance;
