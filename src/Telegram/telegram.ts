import {
  initCloudStorage,
  initHapticFeedback,
  initBackButton,
} from "@telegram-apps/sdk-react";

export const cloudStorage = initCloudStorage();

export const haptic = initHapticFeedback();

export const [backButton] = initBackButton();
