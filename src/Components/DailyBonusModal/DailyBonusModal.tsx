import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { useDailyActivity } from "@/Hooks";
import { Modal, Headline, Text, Button } from "@telegram-apps/telegram-ui";

const DailyBonusModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { activityAvailable } = useDailyActivity();
  const { updateBalance } = useBalance();
  const { t } = useTranslation();

  useEffect(() => {
    const handleModalVisibility = async () => {
      if (activityAvailable) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    };

    handleModalVisibility();
  }, [activityAvailable]);

  const handleModalClose = async () => {
    await updateBalance(3);
    setModalVisible(false);
  };

  return (
    <Modal
      open={modalVisible}
      header={<Modal.Header />}
      className="drawer-modal"
    >
      <div>
        <Headline plain={true} weight="1">
          {t("daily bonus heading")}
        </Headline>
        <Text>{t("dayli bonus greeting")}</Text>
        <Text>{t("here are your coins")}</Text>
        <Button mode="gray" size="l" stretched onClick={handleModalClose}>
          {t("got it")}
        </Button>
      </div>
    </Modal>
  );
};

export default DailyBonusModal;
