import { FC } from "react";
import { Modal, Headline, Text, Spinner } from "@telegram-apps/telegram-ui";
import { useBalance } from "@/Contexts";
import { useEverydayBonus } from "@/Hooks";
import { BalanceCaption } from "@/Components";
import "./styles.scss";

const Balance: FC = () => {
  const { balance } = useBalance();
  const { bonusAvailable } = useEverydayBonus();

  return (
    <div className="balance">
      <p className="balance__value">
        {balance ?? <Spinner size="m" />}
        <span>🌕</span>
      </p>
      <BalanceCaption balance={balance} />
      <Modal
        open={bonusAvailable}
        header={<Modal.Header />}
        className="drawer-modal balance__daily-bonus"
      >
        <Headline plain={true} weight="1">
          Your daily bonus is here!
        </Headline>
        <Text>Hey there and welcome back!</Text>
        <br />
        <Text>Here are your 3 🌕 magic coins.</Text>
      </Modal>
    </div>
  );
};

export default Balance;
