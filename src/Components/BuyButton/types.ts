import { SubmitButtonPropTypes } from "../SubmitButton/types";

export type BuyButtonPropTypes = SubmitButtonPropTypes & {
  caption?: string;
  price?: number;
  className?: string;
};
