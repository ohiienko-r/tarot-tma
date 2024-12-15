import {
  backButton,
  themeParams,
  miniApp,
  initData,
  settingsButton,
  closingBehavior,
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

  if (viewport.mount.isAvailable()) {
    viewport.mount();
    viewport.expand();
  }

  if (themeParams.mount.isAvailable()) {
    themeParams.mount();
  }

  if (miniApp.mount.isAvailable()) {
    miniApp.mount();
    miniApp.setHeaderColor("#110126");
    miniApp.setBackgroundColor("#110126");
    miniApp.setBottomBarColor("#110126");
  }

  if (backButton.mount.isAvailable()) {
    backButton.mount();
  }

  if (settingsButton.mount.isAvailable()) {
    settingsButton.mount();
  }
}
