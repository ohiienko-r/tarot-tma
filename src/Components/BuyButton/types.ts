import { SubmitButtonPropTypes } from "../SubmitButton/types";

export type BuyButtonPropTypes = SubmitButtonPropTypes & {
  caption?: string;
  className?: string;
};
