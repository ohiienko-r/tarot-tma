import { useEffect } from "react";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { useDailyActivity } from "@/Hooks";

const useMyCard = () => {
  const { activityAvailable } = useDailyActivity();

  useEffect(() => {
    const handleCardOfTheDayStateRemoval = async () => {
      if (activityAvailable) {
        await cloudStorage.deleteItem("myCard");
      }
    };

    handleCardOfTheDayStateRemoval();
  }, [activityAvailable]);
};

export default useMyCard;
