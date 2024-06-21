import { retrieveLaunchParams } from "@tma.js/sdk-react";

export const validateInitData = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await fetch(
    "https://tarot-bot-18921c9756be.herokuapp.com/validate_init_data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `tma ${initDataRaw}`,
      },
    }
  );

  const data = await response.json();

  return data.success;
};
