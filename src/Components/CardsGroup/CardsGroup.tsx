import { FC } from "react";
import { Card } from "@/Components";
import { CardsGroupPropTypes } from "./types";
import "./styles.scss";

const CardsGroup: FC<CardsGroupPropTypes> = ({
  cardsKeys,
  cardsFlipped,
  setCardsFlipped,
}) => {
  return (
    <div className="cards-group">
      {cardsKeys.map((cardKey) => (
        <Card
          cardKey={cardKey}
          flipped={cardsFlipped}
          setFlipped={setCardsFlipped}
        />
      ))}
    </div>
  );
};

export default CardsGroup;
