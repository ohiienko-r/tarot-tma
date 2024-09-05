import { initData } from "@/Telegram";
import { Api } from "@/Api";

export const isAdsDisabled = async () => {
  const uId = initData?.user?.id;
  const today = new Date();
  const tillDate = await Api.adsController.getAdsDisabledTill(uId as number);

  if (!tillDate) {
    console.log("No due date in DB");
    return false;
  }

  const dueDate = new Date(tillDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (today.getTime() < dueDate.getTime()) {
    console.log("Ads are disabled");
    return true;
  } else {
    console.log("Ads are enabled");
    return false;
  }
};
