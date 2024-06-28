import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainButton, useShareBotUrl } from "@/Hooks";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { CardsGroup, Page } from "@/Components";

const Readings: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const shareBotUrl = useShareBotUrl();
  useMainButton(t("share"), shareBotUrl, false);
  return (
    <Page>
      <Headline weight="1">{location.state.title}</Headline>
      <CardsGroup cardsKeys={location.state.cardsKeys} />
      <Text>{location.state.reading}</Text>
    </Page>
  );
};

export default Readings;
