import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDailyActivity } from "@/Hooks";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { Modal } from "..";
import { Text, Button } from "@telegram-apps/telegram-ui";
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
    hapticFeedback.impactOccurred("medium");
    navigate(ROUTES_NAMES.PAYMENT);
    setModalVisible(false);
  };

  return (
    <Modal.MinContent
      open={modalVisible}
      onClose={handleModalClose}
      title={t("daily bonus heading")}
    >
      <Text style={{ textAlign: "center" }}>{`${t(
        "dayli bonus greeting"
      )} \n ${t("here are your coins")}`}</Text>
      <Button size="l" stretched onClick={handleModalClose}>
        {t("claim")}
      </Button>
    </Modal.MinContent>
  );
};

export default DailyBonusModal;
