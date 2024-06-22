import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RouterLink } from "@/Components";
import { ROUTES_NAMES } from "@/Router/routes-names";
import { spreadsList } from "./helpers";
import questionMark from "@/assets/question_mark.svg";
import classes from "./main.module.scss";

const Main: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={classes.mainSection}>
      <h2>{t("spreads")}</h2>
      <div className={classes.sreadsList}>
        {spreadsList.map((spread) => (
          <RouterLink key={spread.id} to={spread.name} icon={spread.icon} />
        ))}
      </div>
      <RouterLink
        to={ROUTES_NAMES.HOW_IT_WORKS}
        className="faq-link"
        icon={questionMark}
      />
    </main>
  );
};

export default Main;
