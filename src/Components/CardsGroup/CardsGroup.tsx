import { FC } from "react";
import { Card } from "@/Components";
import { CardsGroupPropTypes } from "./types";
import "./styles.scss";

const CardsGroup: FC<CardsGroupPropTypes> = ({ cardsKeys }) => {
  return (
    <div className="cards-group">
      {cardsKeys.map((cardKey) => (
        <Card cardKey={cardKey} />
      ))}
    </div>
  );
};

export default CardsGroup;
