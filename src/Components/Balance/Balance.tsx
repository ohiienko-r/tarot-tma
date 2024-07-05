import { FC } from "react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useBalance } from "@/Contexts";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <div className="balance__value">
      {balance ?? <Spinner size="l" />}
      <span>🌕</span>
    </div>
  );
};

export default Balance;
