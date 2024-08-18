import {
  initCloudStorage,
  initHapticFeedback,
  initBackButton,
  initPopup,
} from "@telegram-apps/sdk-react";

export const cloudStorage = initCloudStorage();

export const haptic = initHapticFeedback();

export const [backButton] = initBackButton();

export const popup = initPopup();
