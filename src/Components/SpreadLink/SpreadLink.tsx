import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SpreadLinkPropTypes } from "./types";
import currencyIcon from "@/assets/currency_ico.svg";
import classes from "./spreadLink.module.scss";

const SpreadLink: FC<SpreadLinkPropTypes> = ({ to, price }) => {
  const { t } = useTranslation();
  return (
    <Link to={to} className={classes.spreadLink}>
      <div className={classes.spreadPricing}>
        <p>{price}</p>
        <img src={currencyIcon} alt="Moon as currency icon" />
      </div>
      <p>{t(to)}</p>
    </Link>
  );
};

export default SpreadLink;
