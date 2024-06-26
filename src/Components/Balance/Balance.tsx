import { FC, useState, useEffect } from "react";
import {
  Modal,
  Headline,
  Text,
  Spinner,
  Button,
} from "@telegram-apps/telegram-ui";
import { useBalance } from "@/Contexts";
import { useDailyBonus } from "@/Hooks";
import { BalanceCaption } from "@/Components";
import "./styles.scss";

const Balance: FC = () => {
  const { balance, updateBalance } = useBalance();
  const { bonusAvailable, setBonusAvailable } = useDailyBonus();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleModalVisibility = () => {
      if (bonusAvailable) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    };

    handleModalVisibility();
  }, [bonusAvailable]);

  const handleClaimCoins = async () => {
    await updateBalance(3);
    setModalVisible(false);
    setBonusAvailable(false);
  };

  return (
    <div className="balance">
      <div className="balance__value">
        {balance ?? <Spinner size="m" />}
        <span>🌕</span>
      </div>
      <BalanceCaption balance={balance} />
      <Modal
        open={modalVisible}
        header={<Modal.Header />}
        className="drawer-modal balance__daily-bonus"
      >
        <Headline plain={true} weight="1">
          Your daily bonus is here!
        </Headline>
        <Text>Hey there and welcome back!</Text>
        <br />
        <Text>Here are your 3 🌕 magic coins.</Text>
        <Button mode="bezeled" size="m" stretched onClick={handleClaimCoins}>
          Got it!
        </Button>
      </Modal>
    </div>
  );
};

export default Balance;
