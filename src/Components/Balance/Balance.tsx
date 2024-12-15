import { FC } from "react";
import { useUser } from "@/Contexts";
import { Icons } from "..";
import { Spinner } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useUser();

  return (
    <div className="balance">
      {balance ?? <Spinner size="s" />}
      <Icons.Moon />
    </div>
  );
};

export default Balance;
