import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSupportUs } from "@/Hooks";
import { haptic } from "@/Telegram";
import { Icons } from "..";
import { IconButton, Button } from "@telegram-apps/telegram-ui";
import { SupportUsFormPropTypes } from "./types";
import "./styles.scss";

const SupportUsForm: FC<SupportUsFormPropTypes> = ({ onComplete }) => {
  const [starsCount, setStarsCount] = useState<number>(1);
  const supportUs = useSupportUs();
  const { t } = useTranslation();

  const handleIncrementStarsCount = () => {
    haptic.impactOccurred("medium");
    setStarsCount((prev) => prev + 1);
  };

  const handleDecrementStarscount = () => {
    if (starsCount === 1) {
      haptic.notificationOccurred("error");
      setStarsCount((prev) => prev);
    } else {
      haptic.impactOccurred("medium");
      setStarsCount((prev) => prev - 1);
    }
  };

  const handleSendStars = async () => {
    haptic.impactOccurred("medium");
    supportUs(starsCount, onComplete);
  };

  return (
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
        <IconButton size="l" mode="bezeled" onClick={handleIncrementStarsCount}>
          <Icons.Chevron width="30" height="30" />
        </IconButton>
      </div>

      <p className="support-form__caption">{t("you may support us")}</p>
      <Button size="l" onClick={handleSendStars} stretched>
        {t("send")}
      </Button>
    </div>
  );
};

export default SupportUsForm;
