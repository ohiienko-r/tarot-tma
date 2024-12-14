import { initData } from "@telegram-apps/sdk-react";
import { Api } from "@/Api";

export const isAdsDisabled = async () => {
  const uId = initData.user()?.id;
  const today = new Date();
  const tillDate = await Api.adsController.getAdsDisabledTill(uId as number);

  if (!tillDate) {
    return false;
  }

  const dueDate = new Date(tillDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (today.getTime() < dueDate.getTime()) {
    return true;
  } else {
    return false;
  }
};
