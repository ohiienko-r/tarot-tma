import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainButton, useShareBotUrl } from "@/Hooks";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { CardsGroup, Page } from "@/Components";
import "./styles.scss";

const Readings: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const shareBotUrl = useShareBotUrl();
  useMainButton(t("share"), shareBotUrl, false);
  return (
    <Page>
      <Headline weight="1" className="readings__heading">
        {location.state.title}
      </Headline>
      <CardsGroup cardsKeys={location.state.cardsKeys} />
      <Text Component={"p"} className="readings__reading">
        {location.state.reading}
      </Text>
    </Page>
  );
};

export default Readings;
