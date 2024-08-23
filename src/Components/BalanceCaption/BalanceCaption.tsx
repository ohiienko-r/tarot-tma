import { FC } from "react";
import { useTranslation } from "react-i18next";
import { QuestionButtonWithModal } from "@/Components";
import "./styles.scss";

const BalanceCaption: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="balance-caption">
      <p className="balance-caption__currency-name">{t("magic coins")}</p>
      <QuestionButtonWithModal />
    </div>
  );
};

export default BalanceCaption;
