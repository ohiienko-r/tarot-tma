import { FC, useState, useEffect } from "react";
import { useBalance } from "@/Contexts";
import { useDailyBonus } from "@/Hooks";
import { Modal, Headline, Text, Button } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const DailyBonusModal: FC = () => {
  const { updateBalance } = useBalance();
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
    <Modal
      open={modalVisible}
      header={<Modal.Header />}
      className="drawer-modal bouns-modal"
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
  );
};

export default DailyBonusModal;
