import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDailyActivity } from "@/Hooks";
import { Modal, Headline, Text, Button } from "@telegram-apps/telegram-ui";
import { ROUTES_NAMES } from "@/Router";

const DailyBonusModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { activityAvailable } = useDailyActivity();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    navigate(ROUTES_NAMES.PAYMENT);
    setModalVisible(false);
  };

  return (
    <Modal
      open={modalVisible}
      dismissible={false}
      header={<Modal.Header />}
      className="drawer-modal"
    >
      <div>
        <Headline plain={true} weight="1">
          {t("daily bonus heading")}
        </Headline>
        <Text style={{ textAlign: "center" }}>{`${t(
          "dayli bonus greeting"
        )} \n ${t("here are your coins")}`}</Text>
        <Button mode="gray" size="l" stretched onClick={handleModalClose}>
          {t("claim")}
        </Button>
      </div>
    </Modal>
  );
};

export default DailyBonusModal;
