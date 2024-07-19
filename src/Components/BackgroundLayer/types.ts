import { ReactNode } from "react";

export type BackgroundLayerPropTypes = {
  children: ReactNode;
  image: string;
  position?: { x: number; y: number };
};
