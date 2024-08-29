import { useCallback } from "react";
import { initData } from "@/Telegram";
import { useAdsgram } from "@/AdsGram";
import { getAdsDisabledTill } from "@/API/API";

const useAds = () => {
  const advertisment = useAdsgram({ blockId: "586" });

  const isAdsDisabled = useCallback((dueDate: Date) => {
    const today = new Date();
    const tillDate = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    tillDate.setHours(0, 0, 0, 0);

    if (today.getTime() < tillDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }, []);

  const showAdvertisment = useCallback(async () => {
    const uId = initData?.user?.id;

    const disabledTill: Date | null = await getAdsDisabledTill(uId as number);

    if (disabledTill === null) {
      console.log("No due date in db");
      return await advertisment();
    }

    if (disabledTill) {
      if (isAdsDisabled(disabledTill)) {
        console.log("Disabled");
        return;
      } else {
        console.log("Not disabled");
        return await advertisment();
      }
    }
  }, [advertisment, isAdsDisabled]);

  return showAdvertisment;
};

export default useAds;
