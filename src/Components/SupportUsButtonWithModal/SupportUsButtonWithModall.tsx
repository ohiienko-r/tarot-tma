import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { hapticFeedback, invoice, popup } from "@telegram-apps/sdk-react";
import { IconButton, Button } from "@telegram-apps/telegram-ui";
import { BuyButton, Icons, Modal } from "@/Components";
import { Api } from "@/Api";
import "./styles.scss";

const SupportUsButtonWithModal: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(1);
  const { t } = useTranslation();

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const hanldeModalClose = () => {
    hapticFeedback.impactOccurred("medium");
    setModalVisible(false);
  };

  const handleIncrementStarsCount = () => {
    hapticFeedback.impactOccurred("medium");
    setStarsCount((prev) => prev + 1);
  };

  const handleDecrementStarscount = () => {
    if (starsCount === 1) {
      hapticFeedback.notificationOccurred("error");
      setStarsCount((prev) => prev);
    } else {
      hapticFeedback.impactOccurred("medium");
      setStarsCount((prev) => prev - 1);
    }
  };

  const handleSetSum = (sum: number) => {
    hapticFeedback.impactOccurred("medium");
    setStarsCount(sum);
  };

  const handleSendStars = async () => {
    hapticFeedback.impactOccurred("medium");

    const invoiceLink = await Api.botController.getInvoiceLink(
      t("support the developers"),
      t("support the developers"),
      starsCount
    );

    if (invoiceLink) {
      const status = await invoice.open(invoiceLink, "url");

      if (status === "paid") {
        popup.open({ message: t("we appreciate"), title: t("thank you") });
      } else if (status === "failed") {
        popup.open({ message: t("purchase fail"), title: t("error title") });
      }
    }
  };

  return (
    <>
      <BuyButton onPress={handleModalOpen} price={" "}>
        <p>{t("with telegram stars")}</p>
      </BuyButton>
      <Modal.FullScreen
        open={modalVisible}
        onClose={hanldeModalClose}
        title={t("support us")}
      >
        <div className="support-form">
          <div className="support-form__counter">
            <IconButton
              className="support-form__decrement-button"
              size="l"
              mode="bezeled"
              onClick={handleDecrementStarscount}
            >
              <Icons.Chevron width="30" height="30" />
            </IconButton>
            <div className="support-form__stars-counter">
              {starsCount}
              <Icons.TelegramStar />
            </div>
            <IconButton
              size="l"
              mode="bezeled"
              onClick={handleIncrementStarsCount}
            >
              <Icons.Chevron width="30" height="30" />
            </IconButton>
          </div>
          <ul className="support-form__quick-sum-list">
            <Button
              mode="bezeled"
              size="s"
              className="support-form__quick-sum-list--button"
              onClick={() => handleSetSum(10)}
            >
              10
            </Button>
            <Button
              mode="bezeled"
              size="s"
              className="support-form__quick-sum-list--button"
              onClick={() => handleSetSum(50)}
            >
              50
            </Button>
            <Button
              mode="bezeled"
              size="s"
              className="support-form__quick-sum-list--button"
              onClick={() => handleSetSum(100)}
            >
              100
            </Button>
          </ul>
          <p className="support-form__caption">{t("you may support us")}</p>
          <Button size="l" onClick={handleSendStars} stretched>
            {t("send")}
          </Button>
        </div>
      </Modal.FullScreen>
    </>
  );
};

export default SupportUsButtonWithModal;
