export const validateInputs = (rating: number, feedback: string): boolean => {
  if (rating > 0 && feedback.length > 0) {
    return false;
  } else {
    return true;
  }
};
