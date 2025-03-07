import { useCallback } from "react";
import { useAdsgram } from "@/AdsGram";
import { isAdsDisabled } from "./helpers";

const useAds = () => {
  const advertisment = useAdsgram({ blockId: "int-8764" });

  const showAdvertisment = useCallback(async () => {
    if (await isAdsDisabled()) {
      return;
    } else {
      return await advertisment();
    }
  }, [advertisment]);

  return showAdvertisment;
};

export default useAds;
