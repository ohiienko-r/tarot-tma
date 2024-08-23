export type SubmitButtonPropTypes = {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
};
