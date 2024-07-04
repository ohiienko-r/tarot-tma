import { FC, useState, useEffect } from "react";
import { CardPropTypes } from "./types";
import cardReverse from "@/assets/card_reverse.webp";
import "./styles.scss";

const Card: FC<CardPropTypes> = ({ cardKey, big }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

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
      ].join(" ")}
    >
      <img
        src={cardReverse}
        alt="Card reverse"
        className="card__face card__face--front"
      />

      <div className="card__face card__face--back">
        {JSON.stringify(cardKey)}
      </div>
    </div>
  );
};

export default Card;
