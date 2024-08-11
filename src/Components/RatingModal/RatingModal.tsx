import { FC, FormEvent, useState } from "react";
import { useBalance } from "@/Contexts";
import { useTranslation } from "react-i18next";
import { useInfoPopup } from "@/Hooks";
import {
  useHapticFeedback,
  retrieveLaunchParams,
  useCloudStorage,
} from "@telegram-apps/sdk-react";
import {
  Modal,
  IconButton,
  Headline,
  Rating,
} from "@telegram-apps/telegram-ui";
import { sendFeedback } from "@/API/API";
import { validateInputs } from "./helpers";
import { RatingModalPropTypes } from "./types";
import "./styles.scss";

const RatingModal: FC<RatingModalPropTypes> = ({ open, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const { initData } = retrieveLaunchParams();
  const cloudStorage = useCloudStorage();
  const { updateBalance } = useBalance();
  const popup = useInfoPopup();
  const { t } = useTranslation();
  const haptic = useHapticFeedback();

  const handleValueChange = (value: number) => {
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
    console.log(body);
    await updateBalance(3);
    await cloudStorage.set("rated", "true");
    onClose();
    popup(t("thank you for your feedback"));
    await sendFeedback(body);
    setFeedbackText("");
  };

  return (
    <Modal
      className="rating-modal"
      dismissible={false}
      open={open}
      header={
        <Modal.Header
          after={
            <IconButton mode="plain" size="m" onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.50552 4.4401C4.85466 4.08631 5.4245 4.08253 5.77829 4.43166L12.0036 10.575L18.229 4.43166C18.5828 4.08253 19.1526 4.08631 19.5018 4.4401C19.8509 4.79389 19.8471 5.36373 19.4933 5.71286L13.285 11.8395L19.4933 17.9661C19.8471 18.3152 19.8509 18.8851 19.5018 19.2389C19.1526 19.5927 18.5828 19.5964 18.229 19.2473L12.0036 13.1039L5.77829 19.2473C5.4245 19.5964 4.85466 19.5927 4.50552 19.2389C4.15639 18.8851 4.16017 18.3152 4.51396 17.9661L10.7223 11.8395L4.51396 5.71286C4.16017 5.36373 4.15639 4.79389 4.50552 4.4401Z"
                  fill="var(--tg-theme-link-color)"
                />
              </svg>
            </IconButton>
          }
        />
      }
    >
      <Headline weight="2" className="rating-modal__heading">
        {t("rate us")}
      </Headline>
      <form className="rating-modal__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">{`${t("rating")} ${rating}/5`}</label>
          <Rating id="rating" precision={1} onChange={handleValueChange} />
        </div>
        <div className="rating-modal__form--section">
          <label htmlFor="feedback">{`${t("feedback")} (${
            feedbackText.length
          }/300):`}</label>
          <textarea
            id="feedback"
            rows={10}
            maxLength={300}
            className="rating-modal__form--textarea"
            value={feedbackText}
            onChange={(e) => handleFeedbackTextChange(e.currentTarget.value)}
          />
        </div>
        <input
          type="submit"
          value={t("send feedback")}
          className="rating-modal__form--submit"
          disabled={validateInputs(rating, feedbackText)}
        />
      </form>
    </Modal>
  );
};

export default RatingModal;
