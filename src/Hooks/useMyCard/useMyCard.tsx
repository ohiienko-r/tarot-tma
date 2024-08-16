import { useEffect } from "react";
import { cloudStorage } from "@/Telegram";
import { useDailyActivity } from "@/Hooks";

const useMyCard = () => {
  const { activityAvailable } = useDailyActivity();

  useEffect(() => {
    const handleCardOfTheDayStateRemoval = async () => {
      if (activityAvailable) {
        await cloudStorage.delete("myCard");
      }
    };

    handleCardOfTheDayStateRemoval();
  }, [activityAvailable]);
};

export default useMyCard;
