import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainButton, useShareBotUrl, useSaveSpreadState } from "@/Hooks";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { SubmitButton, CardsGroup } from "@/Components";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Readings: FC = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const shareBotUrl = useShareBotUrl();
  useMainButton(t("share"), shareBotUrl, false);
  useSaveSpreadState(
    state.fromPath,
    state.title,
    state.cardsKeys,
    state.reading
  );

  const handleNewSpread = () => {
    switch (state.fromPath) {
      case ROUTES_NAMES.QUESTION_INPUT:
        navigate(-3);
        break;
      case undefined:
        navigate(-1);
        break;
      default:
        navigate(-2);
    }
  };

  const formattedReading = state.reading
    .replace(
      /(\d+\.\s*)?\*\*(.*?)\*\*/g,
      //@ts-expect-error checks required
      (match: string, p1: string, p2: string) => {
        return `<br><strong>${p1 ?? ""}${p2}</strong>`;
      }
    )
    .replace(/###\s*(.*?)(?=\n|$)/g, "<br><h3>$1</h3>");

  return (
    <>
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
        <SubmitButton title={t("new spread")} onPress={handleNewSpread} />
      </div>
    </>
  );
};

export default Readings;
