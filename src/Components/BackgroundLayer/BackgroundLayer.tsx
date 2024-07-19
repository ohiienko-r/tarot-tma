import { FC } from "react";
import { BackgroundLayerPropTypes } from "./types";
import "./styles.scss";

const BackgroundLayer: FC<BackgroundLayerPropTypes> = ({
  children,
  image,
  position,
}) => {
  return (
    <section
      className="background"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position && `${position.x}px ${position?.y}px`,
      }}
    >
      {children}
    </section>
  );
};

export default BackgroundLayer;
