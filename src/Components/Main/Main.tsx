import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES_NAMES } from "@/Router/routes-names";
import { spreadsList } from "./helpers";
import classes from "./main.module.scss";

const Main: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={classes.mainSection}>
      <h2>{t("spreads")}</h2>
      {spreadsList.map((spread) => (
        <Link key={spread.id} to={spread.name}>
          {t(spread.name)}
        </Link>
      ))}
      <Link to={ROUTES_NAMES.HOW_IT_WORKS}>{t("how does it work")}</Link>
    </main>
  );
};

export default Main;
