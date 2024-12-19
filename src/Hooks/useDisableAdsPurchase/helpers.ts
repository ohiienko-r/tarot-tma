import { popup } from "@telegram-apps/sdk-react";
import { supabase } from "@/supabase";

export const setAdsDisabledTill = async (user_id: number) => {
  const today = new Date();
  const tillDate = new Date(today.getDate() + 30).toISOString();

  const { error } = await supabase
    .from("users")
    .update({ ads_disabled_till: tillDate })
    .eq("id", user_id);

  if (error) {
    popup.open({
      message:
        "Failed to set the date till which ads are disabled. Please contact support",
      title: "Error!",
    });
    throw new Error(JSON.stringify(error));
  }
};
