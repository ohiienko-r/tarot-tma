import { useEffect } from "react";
import { cloudStorage } from "@/Telegram";
import { useDailyActivity } from "@/Hooks";

const useDailyBonus = () => {
  const { activityAvailable } = useDailyActivity();

  console.log(activityAvailable);

  useEffect(() => {
    const bonusClaimed = async () => {
      const bonusClaimed = await cloudStorage.get("bonusClaimed");

      console.log(bonusClaimed);

      if (bonusClaimed == "") {
        await cloudStorage.set("bonusClaimed", JSON.stringify(true));
        return;
      }

      if (activityAvailable) {
        await cloudStorage.set("bonusClaimed", JSON.stringify(false));
      }
    };

    bonusClaimed();
  }, [activityAvailable]);
};

export default useDailyBonus;
