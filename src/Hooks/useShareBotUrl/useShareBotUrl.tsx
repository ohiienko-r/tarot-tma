import { useCallback } from "react";
import { utils } from "@/Telegram";
import { useTranslation } from "react-i18next";
import { shareMessage } from "./helpers";

const useShareBotUrl = () => {
  const { i18n } = useTranslation();

  const shareBotUrl = useCallback(() => {
    utils.shareURL(
      "https://t.me/my_ai_tarot_bot/Tarot",
      shareMessage[i18n.language] ?? shareMessage.english
    );
  }, [i18n]);

  return shareBotUrl;
};

export default useShareBotUrl;
