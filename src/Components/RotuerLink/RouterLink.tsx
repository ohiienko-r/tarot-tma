import { FC } from "react";
import { Link } from "react-router-dom";
import { initHapticFeedback } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";
import { RouterLinkPropTypes } from "./types";

const RouterLink: FC<RouterLinkPropTypes> = ({ to, icon, className }) => {
  const hapticFeedback = initHapticFeedback();
  const { t } = useTranslation();

  const handleHapticFeedback = () => {
    hapticFeedback.impactOccurred("medium");
  };

  return (
    <Link
      to={to}
      className={["router-link", className && className].join(" ")}
      onClick={handleHapticFeedback}
    >
      <p>{t(to)}</p>
      {icon && <img src={icon} />}
    </Link>
  );
};

export default RouterLink;
