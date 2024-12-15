import { useEffect } from "react";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { useDailyActivity } from "@/Hooks";

const useDailyBonus = () => {
  const { activityAvailable } = useDailyActivity();

  useEffect(() => {
    const bonusClaimed = async () => {
      const bonusClaimed = await cloudStorage.getItem("bonusClaimed");

      if (bonusClaimed == "") {
        await cloudStorage.setItem("bonusClaimed", JSON.stringify(true));
        return;
      }

      if (activityAvailable) {
        await cloudStorage.setItem("bonusClaimed", JSON.stringify(false));
      }
    };

    bonusClaimed();
  }, [activityAvailable]);
};

export default useDailyBonus;
