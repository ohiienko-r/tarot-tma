import { FC } from "react";
import { Card } from "@/Components";
import { CardKey } from "@/types";
import "./styles.scss";

type CardsGroupPropTypes = {
  cardsKeys: CardKey[];
};

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
