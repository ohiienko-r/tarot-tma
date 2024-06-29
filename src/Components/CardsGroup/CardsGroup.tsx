import { FC } from "react";
import { Card } from "@/Components";
import { CardsGroupPropTypes } from "./types";
import "./styles.scss";

const CardsGroup: FC<CardsGroupPropTypes> = ({ cardsKeys }) => {
  return (
    <div className="cards-group">
      {cardsKeys.map((cardKey) => (
        <Card
          key={JSON.stringify(cardKey)}
          cardKey={cardKey}
          big={cardsKeys.length < 2}
        />
      ))}
    </div>
  );
};

export default CardsGroup;
