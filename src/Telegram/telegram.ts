import {
  initCloudStorage,
  initHapticFeedback,
  initBackButton,
  initPopup,
  initUtils,
  initMainButton,
  initSettingsButton,
} from "@telegram-apps/sdk-react";

export const cloudStorage = initCloudStorage();

export const haptic = initHapticFeedback();

export const [backButton] = initBackButton();

export const popup = initPopup();

export const utils = initUtils();

export const [mainButton] = initMainButton();

export const [settingsButton] = initSettingsButton();
