import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useBackButton } from "@/Hooks";
import { Page } from "@/Components";
import "./style.scss";

const About: FC = () => {
  const { t } = useTranslation();
  useBackButton();

  return (
    <Page className="about">
      <h2>{t("how it works header")}</h2>
      <p>{t("paragraph 1")}</p>
      <h2>{t("ai and tarot header")}</h2>
      <p>{t("paragraph 2 pt1")}</p>
      <ol className="about__list">
        <li>{t("li 1")}</li>
        <li>{t("li 2")}</li>
        <li>{t("li 3")}</li>
      </ol>
      <p>{t("paragraph 2 pt")}</p>
      <br />
      <p>{t("li heading:")}</p>
      <ol className="about__list">
        <li>{t("li 4")}</li>
        <li>{t("li 5")}</li>
        <li>{t("li 6")}</li>
        <li>{t("li 7")}</li>
        <li>{t("li 8")}</li>
      </ol>
      <p>{t("paragraph 3")}</p>
    </Page>
  );
};

export default About;
