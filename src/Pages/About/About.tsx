import { useTranslation } from "react-i18next";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { Page } from "@/Components";
import { FC } from "react";
import "./style.scss";

const About: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className="about">
      <Headline weight="1">{t("how it works header")}</Headline>
      <Text Component={"p"}>{t("paragraph 1")}</Text>
      <Headline weight="1">{t("ai and tarot header")}</Headline>
      <Text Component={"p"}>{t("paragraph 2 pt1")}</Text>
      <ol className="about__list">
        <li>{t("li 1")}</li>
        <li>{t("li 2")}</li>
        <li>{t("li 3")}</li>
      </ol>
      <Text Component={"p"}>{t("paragraph 2 pt")}</Text>
      <br />
      <Text Component={"p"}>{t("li heading:")}</Text>
      <ol className="about__list">
        <li>{t("li 4")}</li>
        <li>{t("li 5")}</li>
        <li>{t("li 6")}</li>
        <li>{t("li 7")}</li>
        <li>{t("li 8")}</li>
      </ol>
      <Text Component={"p"}>{t("paragraph 3")}</Text>
    </Page>
  );
};

export default About;