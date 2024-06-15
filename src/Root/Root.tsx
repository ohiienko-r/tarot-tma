import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES_NAMES } from "@/Router/routes-names";
import { useTranslation } from "react-i18next";
import classes from "./root.module.scss";

const queryParams = new URLSearchParams(window.location.search);
const language = queryParams.get("lang");

const Root: FC = () => {
  const { i18n, t } = useTranslation();
  i18n.changeLanguage(language ?? "english");

  return (
    <>
      <header>{t("greeting")}</header>
      <main className={classes.mainSection}>
        <h2>{t("spreads")}</h2>
        <Link to={ROUTES_NAMES.CARD_OF_THE_DAY}>{t("card of the day")}</Link>
        <Link to={ROUTES_NAMES.YES_NO}>{t("yes/no")}</Link>
        <Link to={ROUTES_NAMES.ASK_QUESTION}>
          {t("ask the cards a question")}
        </Link>
        <Link to={ROUTES_NAMES.HOW_IT_WORKS}>{t("how does it work")}</Link>
      </main>
    </>
  );
};

export default Root;
