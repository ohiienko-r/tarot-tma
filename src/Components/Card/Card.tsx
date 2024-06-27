import { FC } from "react";
import { CardPropTypes } from "./types";
import "./styles.scss";

const Card: FC<CardPropTypes> = (key) => {
  return <div className="card">{JSON.stringify(key)}</div>;
};

export default Card;
