import { FC } from "react";
import { Link } from "react-router-dom";
import { SpreadLink } from "@/Components";
import { useTranslation } from "react-i18next";
import { ROUTES_NAMES } from "@/Router/routes-names";
import { spreadsList } from "./helpers";
import classes from "./main.module.scss";

const Main: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={classes.mainSection}>
      <h2>{t("spreads")}</h2>
      <div className={classes.sreadsList}>
        {spreadsList.map((spread) => (
          <SpreadLink key={spread.id} to={spread.name} price={spread.price} />
        ))}
      </div>
      <Link to={ROUTES_NAMES.HOW_IT_WORKS} className="faq-link">
        {t("how does it work")}
      </Link>
    </main>
  );
};

export default Main;
