import { FC, ReactNode } from "react";
import "./styles.scss";

type BackgroundLayerPropTypes = {
  children: ReactNode;
  image: string;
  position?: { x: number; y: number };
};

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
