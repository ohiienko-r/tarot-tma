import { CardKey, ImageModule } from "./types";

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
