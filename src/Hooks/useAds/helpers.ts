import { initData, popup } from "@telegram-apps/sdk-react";
import { supabase } from "@/supabase";

export const isAdsDisabled = async () => {
  const user_id = initData.user()?.id;
  const today = new Date();

  const { data, error } = await supabase
    .from("users")
    .select("ads_disabled_till")
    .eq("id", user_id)
    .maybeSingle<{ ads_disabled_till: string }>();

  if (error) {
    popup.open({
      message:
        "Failed to get date till which ads are disabled. Please contact support.",
      title: "Error!",
    });
    throw new Error(JSON.stringify(error));
  }

  if (!data) {
    return false;
  }

  const dueDate = new Date(data.ads_disabled_till);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return today.getTime() < dueDate.getTime();
};
