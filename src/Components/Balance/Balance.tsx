import { FC } from "react";
import { useBalance } from "@/Contexts";
import { Spinner } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <div className="balance__value">
      {balance ?? <Spinner size="s" />}
      <span>🌕</span>
    </div>
  );
};

export default Balance;
