import { FC, useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  useHapticFeedback,
  retrieveLaunchParams,
  useCloudStorage,
} from "@telegram-apps/sdk-react";
import { useBalance } from "@/Contexts";
import { useInfoPopup } from "@/Hooks";
import { Rating } from "@telegram-apps/telegram-ui";
import { validateInputs } from "../RatingModal/helpers";
import { sendFeedback } from "@/API/API";
import { FeedbackFormPropTypes } from "./types";
import "./styles.scss";

const FeedbackForm: FC<FeedbackFormPropTypes> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const { initData } = retrieveLaunchParams();
  const cloudStorage = useCloudStorage();
  const { updateBalance } = useBalance();
  const popup = useInfoPopup();
  const { t } = useTranslation();
  const haptic = useHapticFeedback();

  const handleRatingChange = (value: number) => {
    haptic.selectionChanged();
    setRating(value);
  };

  const handleFeedbackTextChange = (value: string) => {
    setFeedbackText(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    haptic.impactOccurred("medium");
    const body = {
      uId: initData?.user?.id,
      name: initData?.user?.firstName,
      rating: rating,
      feedback: feedbackText,
    };
    await updateBalance(3);
    await cloudStorage.set("rated", "true");
    onClose();
    popup(t("thank you for your feedback"));
    await sendFeedback(body);
    setFeedbackText("");
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
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
          onChange={(e) => handleFeedbackTextChange(e.currentTarget.value)}
        />
      </div>
      <input
        type="submit"
        value={t("send feedback")}
        className="feedback-form__submit"
        disabled={validateInputs(rating, feedbackText)}
      />
    </form>
  );
};

export default FeedbackForm;
