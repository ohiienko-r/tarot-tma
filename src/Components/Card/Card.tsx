import { FC, useState, useEffect } from "react";
import { CardPropTypes } from "./types";
import { CardKey } from "@/types";
import cardReverse from "@/assets/card_reverse.webp";
import formattedImages from "@/helpers";
import "./styles.scss";

const Card: FC<CardPropTypes> = ({ cardKey, big }) => {
  const [cardSrc, setCardSrc] = useState<string>("");
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    const getCard = () => {
      if (cardKey.includes("reversed")) {
        const cleanName: CardKey = cardKey
          .replace("_reversed", "")
          .trim() as CardKey;
        setCardSrc(formattedImages[cleanName]);
      } else {
        setCardSrc(formattedImages[cardKey]);
      }
    };

    getCard();
  }, [cardKey]);

  useEffect(() => {
    setTimeout(() => {
      setFlipped(true);
    }, 500);
  }, []);

  return (
    <div
      className={[
        "card",
        big ? "card--big" : "card--default",
        flipped && "card__flipped",
        cardKey.includes("reversed") && "card--reversed",
      ].join(" ")}
    >
      <img
        src={cardReverse}
        alt="Card reverse"
        className="card__face card__face--front"
      />
      <img
        src={cardSrc}
        alt="Card front"
        className="card__face card__face--back"
      />
    </div>
  );
};

export default Card;
