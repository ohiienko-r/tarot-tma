import { useState, useEffect } from "react";
import { mainButton, hapticFeedback } from "@telegram-apps/sdk-react";

const useMainButton = (
  title: string,
  onClick: () => Promise<void> | void,
  disabled: boolean
) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (mainButton.mount.isAvailable()) {
      mainButton.mount();
      mainButton.setParams({ isVisible: true, hasShineEffect: true });
    }

    return () => {
      mainButton.setParams({ isVisible: false });
      mainButton.unmount();
    };
  }, []);

  useEffect(() => {
    mainButton.setParams({ text: title });
  }, [title]);

  useEffect(() => {
    const handler = async () => {
      hapticFeedback.impactOccurred("medium");
      mainButton.setParams({
        isEnabled: false,
        isLoaderVisible: true,
        hasShineEffect: false,
      });
      setLoading(true);
      await onClick();
      setLoading(false);
      mainButton.setParams({
        isLoaderVisible: false,
        isEnabled: true,
        hasShineEffect: true,
      });
    };

    mainButton.onClick(handler);

    return () => {
      mainButton.offClick(handler);
    };
  }, [onClick]);

  useEffect(() => {
    if (disabled) {
      mainButton.setParams({
        isEnabled: false,
        backgroundColor: "#808080",
        hasShineEffect: false,
      });
    } else {
      mainButton.setParams({
        isEnabled: true,
        backgroundColor: "#EA850F",
        hasShineEffect: true,
      });
    }
  }, [disabled]);

  return loading;
};

export default useMainButton;
