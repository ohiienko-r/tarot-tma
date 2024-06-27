import { FC } from "react";
import { CardPropTypes } from "./types";
import "./styles.scss";

const Card: FC<CardPropTypes> = ({ cardKey, flipped, setFlipped }) => {
  const handleClick = () => {
    setFlipped(true);
  };
  return (
    <div
      className={["card", flipped && "card__flipped"].join(" ")}
      onClick={handleClick}
    >
      <div className="card__face card__face--front">RUBASKHA</div>
      <div className="card__face card__face--back">
        {JSON.stringify(cardKey)}
      </div>
    </div>
  );
};

export default Card;
