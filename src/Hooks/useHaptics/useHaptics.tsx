import WebApp from "@twa-dev/sdk";

const useHaptics = () => {
  const haptics = WebApp.HapticFeedback.impactOccurred;
  return haptics;
};

export default useHaptics;
