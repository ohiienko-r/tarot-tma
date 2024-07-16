import { useCallback, useEffect, useRef } from "react";
import { AdController, ShowPromiseResult } from "../adsgram";
import { UseAdsgramProptypes } from "./types";

const useAdsgram = ({ blockId, onReward, onError }: UseAdsgramProptypes) => {
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId });
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          console.log("Reward granted");
          onReward && onReward();
        })
        .catch((result: ShowPromiseResult) => {
          console.error(`An error occured: ${result}`);
          onError && onError(result);
        });
    } else {
      onError &&
        onError({
          error: true,
          done: false,
          state: "load",
          description: "Adsgram script not loaded",
        });
    }
  }, [onReward, onError]);
};

export default useAdsgram;
