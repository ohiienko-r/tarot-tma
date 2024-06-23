import { FC } from "react";
import { useTranslation } from "react-i18next";
import questionMark from "@/assets/plain_question_mark.svg";
import "./styles.scss";

const BalanceCaption: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="balance-caption">
      <p className="balance-caption__currency-name">{t("magic coins")}</p>
      <button className="balance-caption__hint-button">
        <img src={questionMark} />
      </button>
    </div>
  );
};

export default BalanceCaption;
