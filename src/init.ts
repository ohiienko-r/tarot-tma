import {
  backButton,
  themeParams,
  miniApp,
  initData,
  settingsButton,
  closingBehavior,
  swipeBehavior,
  init as initSDK,
} from "@telegram-apps/sdk-react";

export function init(): void {
  initSDK();

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error("ERR_NOT_SUPPORTED");
  }

  if (closingBehavior.mount.isAvailable()) {
    closingBehavior.mount();
    closingBehavior.enableConfirmation();
  }

  if (swipeBehavior.mount.isAvailable()) {
    swipeBehavior.mount();
    swipeBehavior.disableVertical();
  }

  backButton.mount();
  miniApp.mount();
  themeParams.mount();
  settingsButton.mount();
  initData.restore();
}
