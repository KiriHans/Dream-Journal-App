const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const minimumLengthValidator = (minLength: number): ((value: string) => boolean) => {
  return (value: string) => value.length >= minLength;
};

export const emailValidator = (value: string): boolean => {
  // if (value.length === 0) return true;

  return EMAIL_REGEXP.test(value);
};
