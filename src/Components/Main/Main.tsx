import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RouterLink } from "@/Components";
import { ROUTES_NAMES } from "@/Router/routes-names";
import { spreadsList } from "./helpers";
import questionMark from "@/assets/question_mark.svg";
import "./styles.scss";

const Main: FC = () => {
  const { t } = useTranslation();

  return (
    <main className="main-section">
      <h2>{t("spreads")}</h2>
      <ul className="main-section__spreads-list">
        {spreadsList.map((spread) => (
          <RouterLink key={spread.id} to={spread.name} icon={spread.icon} />
        ))}
      </ul>
      <RouterLink
        to={ROUTES_NAMES.HOW_IT_WORKS}
        className="main-section__faq-link"
        icon={questionMark}
      />
    </main>
  );
};

export default Main;
