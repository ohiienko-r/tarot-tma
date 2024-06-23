import { FC } from "react";
import { Skeleton } from "@telegram-apps/telegram-ui";
import { useBalance } from "@/Hooks";
import { BalanceCaption } from "@/Components";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <div className="balance">
      <p className="balance__value">
        <Skeleton visible={!balance} className="balance__skeleton">
          {balance}
        </Skeleton>
        <span>🌕</span>
      </p>
      <BalanceCaption balance={balance} />
    </div>
  );
};

export default Balance;
