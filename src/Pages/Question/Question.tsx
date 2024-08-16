import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { haptic } from "@/Telegram";
import {
  useMainButtonHandler,
  useMainButton,
  useMainButtonState,
  useBackButton,
} from "@/Hooks";
import { analytics } from "@/Firebase";
import { logEvent } from "firebase/analytics";
import { Page } from "@/Components";
import { Headline, Button } from "@telegram-apps/telegram-ui";
import { Path } from "@/types";
import "./styles.scss";

const Question: FC = () => {
  const [prompt, setPrompt] = useState("");
  const { pathname, state } = useLocation();
  const { t } = useTranslation();
  const handler = useMainButtonHandler(
    state.spreadPrice,
    state.cardsQty,
    pathname as Path,
    prompt
  );
  const disabled = useMainButtonState(pathname as Path, prompt);
  useMainButton(
    `${t("get spread")} ${state.spreadPrice} 🌕`,
    handler,
    disabled
  );
  useBackButton();
  logEvent(analytics, "page_view", { page_title: "Question to the cards" });

  const defaultQuestionHadler = (index: number) => {
    haptic.impactOccurred("medium");
    setPrompt(t(`default question ${index}`));
  };

  const defaultQuestions = [
    {
      id: 0,
      question: t("default question 1"),
      onClick: () => defaultQuestionHadler(1),
    },
    {
      id: 1,
      question: t("default question 2"),
      onClick: () => defaultQuestionHadler(2),
    },
    {
      id: 2,
      question: t("default question 3"),
      onClick: () => defaultQuestionHadler(3),
    },
  ];

  return (
    <Page>
      <Headline weight="1" className="question__heading">
        {t(pathname)}
      </Headline>
      <div className="question__input-container">
        <label htmlFor="question-input">{t("input label")}</label>
        <input
          id="question-input"
          type="text"
          placeholder={t("input placeholder")}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          className="question__input"
        />
      </div>
      <ul className="question__questions-list">
        {defaultQuestions.map((question) => (
          <Button
            key={question.id}
            size="s"
            mode="outline"
            onClick={question.onClick}
            className="question__default-question"
          >
            {question.question}
          </Button>
        ))}
      </ul>
    </Page>
  );
};

export default Question;
