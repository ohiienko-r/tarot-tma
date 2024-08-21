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
import { SubmitButton, CardsGroup, Page } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
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
    cardsKeys: state.cardsKeys,
    reading: state.reading,
  });
  useBackButton(quitConfirmation);
  logEvent(analytics, "page_view", {
    page_title: "Reading",
    page_path: `Spread reading from ${state.fromPath}`,
  });

  const formattedReading = state.reading
    .replace(
      /(\d+\.\s*)?\*\*(.*?)\*\*/g,
      //@ts-expect-error checks required
      (match: string, p1: string, p2: string) => {
        return `<br><strong>${p1 ?? ""}${p2}</strong>`;
      }
    )
    .replace(/###\s*(.*?)(?=\n|$)/g, "<br><br><h3>$1</h3>");

  return (
    <Page>
      <Headline weight="1" className="readings__heading">
        {state.title}
      </Headline>
      <CardsGroup cardsKeys={state.cardsKeys} />
      <Text
        Component={"p"}
        className="readings__reading"
        dangerouslySetInnerHTML={{ __html: formattedReading }}
      />
      <div className="readings__new-spread">
        <SubmitButton title={t("new spread")} onPress={quitConfirmation} />
      </div>
    </Page>
  );
};

export default Readings;
