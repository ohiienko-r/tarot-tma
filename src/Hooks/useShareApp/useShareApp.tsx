import { useCallback } from "react";
import { useUser } from "@/Contexts";
import { utils } from "@/Telegram";
import { useTranslation } from "react-i18next";
import { shareMessage } from "./helpers";

const useShareBotUrl = () => {
  const { user } = useUser();
  const { i18n } = useTranslation();

  const shareBotUrl = useCallback(() => {
    utils.shareURL(
      `https://t.me/my_ai_tarot_bot/?startapp=${user?.uId}`,
      shareMessage[i18n.language] ?? shareMessage.english
    );
  }, [i18n, user]);

  return shareBotUrl;
};

export default useShareBotUrl;
