const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const minimumLengthValidator = (minLength: number): ((value: string) => boolean) => {
  return (value: string) => value.length >= minLength;
};

export const maximumLengthValidator = (maxLength: number): ((value: string) => boolean) => {
  return (value: string) => value.length <= maxLength;
};

export const notEmpty = (value: string) => value.length !== 0;

export const emailValidator = (value: string): boolean => {
  return EMAIL_REGEXP.test(value);
};
