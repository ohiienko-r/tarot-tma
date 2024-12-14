import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icons } from "..";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const FaqLink = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={ROUTES_NAMES.ABOUT}
      onClick={() => hapticFeedback.impactOccurred("medium")}
      className="faq-link"
    >
      {t(ROUTES_NAMES.ABOUT)}
      <Icons.QuestionMark fill="rgba(255, 199, 0, 50%)" />
    </Link>
  );
};

export default FaqLink;
