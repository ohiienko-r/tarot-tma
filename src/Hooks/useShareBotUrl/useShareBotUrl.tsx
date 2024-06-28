import { useUtils } from "@tma.js/sdk-react";

const useShareBotUrl = () => {
  const utils = useUtils();

  const shareBotUrl = () => {
    utils.shareURL("https://t.me/my_ai_tarot_bot");
  };

  return shareBotUrl;
};

export default useShareBotUrl;
