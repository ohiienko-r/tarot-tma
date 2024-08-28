import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { ValidationResponse, CardKey, ImageModule } from "./types";

export const validateInitData = async (): Promise<boolean> => {
  const { initDataRaw } = retrieveLaunchParams();

  try {
    const response = await fetch(
      import.meta.env.VITE_INIT_DATA_VALIDATION_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `tma ${initDataRaw}`,
        },
      }
    );

    const data: ValidationResponse = await response.json();

    return data.success;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getInvoiceLink = async (
  title: string,
  description: string,
  amount: number,
  coinsQty?: number
): Promise<string | undefined> => {
  try {
    const invoiceTitle = coinsQty ? `${coinsQty} ${title}` : title;

    const response = await fetch(
      "https://tarot-bot-18921c9756be.herokuapp.com/create_invoice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: invoiceTitle,
          description: description,
          amount: amount,
          label: title,
        }),
      }
    );

    const invoiceLink = await response.json();

    return invoiceLink;
  } catch (error) {
    console.error(`An error occured: ${error}`);
  }
};

export const SPREADS = {
  CARD_OF_THE_DAY: {
    PRICE: 2,
    CARDS_QTY: 1,
  },
  YES_NO: {
    PRICE: 3,
    CARDS_QTY: 1,
  },
  QUESTION_TO_THE_CARDS: {
    PRICE: 5,
    CARDS_QTY: 3,
  },
} as const;

const images = import.meta.glob<ImageModule>(
  "./Cards/img/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
  }
);

const formattedImages: Record<CardKey, string> = {} as Record<CardKey, string>;

for (const path in images) {
  const key = path
    .replace("./Cards/img/", "")
    .replace(/\.(png|jpe?g|webp)$/, "") as CardKey;
  formattedImages[key] = images[path].default;
}

export default formattedImages;

export const shuffle = (array: string[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
