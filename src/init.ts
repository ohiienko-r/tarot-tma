import {
  backButton,
  themeParams,
  miniApp,
  initData,
  settingsButton,
  closingBehavior,
  swipeBehavior,
  viewport,
  init as initSDK,
} from "@telegram-apps/sdk-react";

export function init(): void {
  initSDK();

  initData.restore();

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

  if (viewport.mount.isAvailable()) {
    viewport.mount();
    viewport.expand();
  }

  if (themeParams.mount.isAvailable()) {
    themeParams.mount();
  }

  if (miniApp.mount.isAvailable()) {
    miniApp.mount();
    miniApp.setHeaderColor("#0F062A");
    miniApp.setBackgroundColor("#0F062A");
    miniApp.setBottomBarColor("#0F062A");
  }

  if (backButton.mount.isAvailable()) {
    backButton.mount();
  }

  if (settingsButton.mount.isAvailable()) {
    settingsButton.mount();
  }
}
