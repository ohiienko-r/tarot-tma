import { FC, useState, FormEvent } from "react";
import { useUser } from "@/Contexts";
import { BuyButton, Modal, Icons } from "@/Components";
import { hapticFeedback, cloudStorage, popup } from "@telegram-apps/sdk-react";
import { Rating, Button } from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import { supabase } from "@/supabase";
import "./styles.scss";

type RateButtonWithModalPropTypes = {
  onSubmit: () => void;
};

const RateButtonWithModal: FC<RateButtonWithModalPropTypes> = ({
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { user, updateBalance } = useUser();

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    hapticFeedback.impactOccurred("medium");
    setModalVisible(false);
  };

  const handleRatingChange = (value: number) => {
    hapticFeedback.selectionChanged();
    setRating(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    hapticFeedback.impactOccurred("medium");

    setLoading(true);

    const { error } = await supabase.from("feedbacks").insert({
      user_id: user?.id,
      first_name: user?.first_name ?? null,
      rating: rating,
      feedback: feedbackText,
    });

    if (error) {
      console.error("Failed to submit feedback to DB");

      popup.open({
        message: "Failed to submit feedback. Please contact support",
        title: "Error!",
      });

      return;
    }

    onSubmit();

    await cloudStorage.setItem("rated", "true");

    setLoading(false);

    await updateBalance(3);

    handleModalClose();

    popup.open({ message: t("thank you for your feedback") });

    setFeedbackText("");
  };

  return (
    <>
      <BuyButton onPress={handleModalOpen}>
        <div
          style={{
            fontWeight: 700,
            fontSize: "25px",
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          3<Icons.Moon size={12} />
        </div>
        <p>{t("for rating us")}</p>
      </BuyButton>
      <Modal.FullScreen
        open={modalVisible}
        onClose={handleModalClose}
        title={t("rate us")}
      >
        <form className="feedback-form">
          <div>
            <label htmlFor="rating">{`${t("rating")} ${rating}/5`}</label>
            <Rating id="rating" precision={1} onChange={handleRatingChange} />
          </div>
          <div className="feedback-form__section">
            <label htmlFor="feedback">{`${t("feedback")} (${
              feedbackText.length
            }/300):`}</label>
            <textarea
              id="feedback"
              rows={10}
              maxLength={300}
              className="feedback-form__textarea"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.currentTarget.value)}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  "var(--tg-theme-link-color)")
              }
              onBlur={(e) => (e.currentTarget.style.borderColor = "#f2f2f2")}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!(rating > 0 && feedbackText.length > 0)}
            size="l"
            loading={loading}
          >
            {t("send feedback")}
          </Button>
        </form>
      </Modal.FullScreen>
    </>
  );
};

export default RateButtonWithModal;
