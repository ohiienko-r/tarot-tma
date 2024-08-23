import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useSaveSpreadState,
  useBackButton,
  useQuitBehaviour,
  useSendSpread,
} from "@/Hooks";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { SubmitButton, CardsGroup, Page, MarkdownToHTML } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const Readings: FC = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const quitConfirmation = useQuitBehaviour(state.fromPath);
  useSaveSpreadState(
    state.fromPath,
    state.title,
    state.cardsKeys,
    state.reading
  );
  useSendSpread({
    fromPath: state.fromPath,
    title: state.title,
    prompt: state.prompt,
    cardsKeys: state.cardsKeys,
    reading: state.reading,
  });
  useBackButton(quitConfirmation);
  logEvent(analytics, "page_view", {
    page_title: "Reading",
    page_path: `Spread reading from ${state.fromPath}`,
  });

  return (
    <Page>
      <Headline weight="1" className="readings__heading">
        {state.title}
      </Headline>
      <CardsGroup cardsKeys={state.cardsKeys} />
      <MarkdownToHTML markdownText={state.reading} />
      <div className="readings__new-spread">
        <SubmitButton title={t("new spread")} onPress={quitConfirmation} />
      </div>
    </Page>
  );
};

export default Readings;
