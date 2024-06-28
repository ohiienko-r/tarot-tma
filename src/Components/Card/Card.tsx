import { FC, useState, useEffect } from "react";
import { CardPropTypes } from "./types";
import "./styles.scss";

const Card: FC<CardPropTypes> = ({ cardKey }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setFlipped(true);
    }, 200);
  }, []);

  return (
    <div className={["card", flipped && "card__flipped"].join(" ")}>
      <div className="card__face card__face--front">RUBASKHA</div>
      <div className="card__face card__face--back">
        {JSON.stringify(cardKey)}
      </div>
    </div>
  );
};

export default Card;
