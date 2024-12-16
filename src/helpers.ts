import { CardKey, ImageModule } from "./types";

export const unsupportedFullScreenPlatforms = [
  "macos",
  "tdesktop",
  "unigram",
  "unknown",
  "web",
  "weba",
];

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffle = (array: any[]) => {
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
