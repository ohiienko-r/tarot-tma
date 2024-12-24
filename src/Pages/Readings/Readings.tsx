import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { popup, hapticFeedback } from "@telegram-apps/sdk-react";
import { useBackButton, useSendSpread } from "@/Hooks";
import { Button } from "@telegram-apps/telegram-ui";
import { CardsGroup, Page, MarkdownToHTML } from "@/Components";
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
      <h2 className="readings__heading">{t("reading")}</h2>
      <CardsGroup cardsKeys={state.cardsKeys} />
      <MarkdownToHTML markdownText={state.reading} />
      <div className="readings__new-spread">
        <Button
          size="l"
          stretched
          onClick={handleNavigateHome}
          style={{ backgroundColor: "#EA850F" }}
        >
          {t("new spread")}
        </Button>
      </div>
    </Page>
  );
};

export default Readings;
