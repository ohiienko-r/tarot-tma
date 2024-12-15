import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { popup, hapticFeedback } from "@telegram-apps/sdk-react";
import { useBackButton, useSendSpread } from "@/Hooks";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { SubmitButton, CardsGroup, Page, MarkdownToHTML } from "@/Components";
import { Headline } from "@telegram-apps/telegram-ui";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Readings: FC = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();

  useSendSpread({
    fromPath: state.fromPath,
    title: state.title,
    prompt: state.prompt,
    cardsKeys: state.cardsKeys,
    reading: state.reading,
  });

  logEvent(analytics, "page_view", {
    page_title: "Reading",
    page_path: `Spread reading from ${state.fromPath}`,
  });

  const handleNavigateHome = useCallback(() => {
    hapticFeedback.impactOccurred("medium");

    popup
      .open({
        title: t("warning"),
        message: t("quit message"),
        buttons: [
          { id: "cancel", type: "cancel" },
          { id: "quit", type: "destructive", text: t("quit anyway") },
        ],
      })
      .then((buttonId) => {
        if (buttonId === "quit") {
          hapticFeedback.impactOccurred("medium");
          navigate(ROUTES_NAMES.HOME);
        }
      });
  }, [navigate, t]);

  useBackButton(handleNavigateHome);

  return (
    <Page>
      <Headline weight="1" className="readings__heading">
        {state.title}
      </Headline>
      <CardsGroup cardsKeys={state.cardsKeys} />
      <MarkdownToHTML markdownText={state.reading} />
      <div className="readings__new-spread">
        <SubmitButton title={t("new spread")} onPress={handleNavigateHome} />
      </div>
    </Page>
  );
};

export default Readings;
