import { FC } from "react";
import { Link } from "react-router-dom";
import { initHapticFeedback } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";
import { RouterLinkPropTypes } from "./types";
import currencyIcon from "@/assets/currency_ico.svg";
import classes from "./routerLink.module.scss";

const RouterLink: FC<RouterLinkPropTypes> = ({
  to,
  price,
  icon,
  className,
}) => {
  const hapticFeedback = initHapticFeedback();
  const { t } = useTranslation();

  const handleHapticFeedback = () => {
    hapticFeedback.impactOccurred("medium");
  };

  return (
    <Link
      to={to}
      className={className ?? classes.spreadLink}
      onClick={handleHapticFeedback}
    >
      {price && (
        <div className={classes.spreadPricing}>
          <p>{price}</p>
          {icon && <img src={currencyIcon} alt="Moon as currency icon" />}
        </div>
      )}
      <p>{t(to)}</p>
    </Link>
  );
};

export default RouterLink;
