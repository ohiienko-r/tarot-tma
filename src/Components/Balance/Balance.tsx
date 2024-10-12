import { FC } from "react";
import { useUser } from "@/Contexts";
import { Spinner } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useUser();

  return (
    <div className="balance__value">
      {balance ?? <Spinner size="s" />}
      <span>🌕</span>
    </div>
  );
};

export default Balance;
