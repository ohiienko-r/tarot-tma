import { FC } from "react";
import {
  Modal,
  Headline,
  Text,
  Button,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { useBalance } from "@/Contexts";
import { useEverydayBonus } from "@/Hooks";
import { BalanceCaption } from "@/Components";
import "./styles.scss";

const Balance: FC = () => {
  const { balance, updateBalance } = useBalance();
  const { bonusAvailable } = useEverydayBonus();

  const handleBalanceUpdate = async () => {
    await updateBalance(3);
  };

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
        className="drawer-modal"
      >
        <Headline plain={true} weight="1">
          Your daily bonus is here!
        </Headline>
        <Text>Hey there and welcome back! Here is your 3 🌕 magic coins.</Text>
        <Modal.Close>
          <Button
            mode="bezeled"
            size="m"
            stretched
            onClick={handleBalanceUpdate}
          >
            Got it!
          </Button>
        </Modal.Close>
      </Modal>
    </div>
  );
};

export default Balance;
