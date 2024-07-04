import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainButton, useShareBotUrl, useSaveSpreadState } from "@/Hooks";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { CardsGroup } from "@/Components";
import "./styles.scss";

const Readings: FC = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const shareBotUrl = useShareBotUrl();
  useMainButton(t("share"), shareBotUrl, false);
  useSaveSpreadState(
    state.fromPath,
    state.title,
    state.cardsKeys,
    state.reading
  );

  return (
    <>
      <Headline weight="1" className="readings__heading">
        {state.title}
      </Headline>
      <CardsGroup cardsKeys={state.cardsKeys} />
      <Text Component={"p"} className="readings__reading">
        {state.reading}
      </Text>
    </>
  );
};

export default Readings;
