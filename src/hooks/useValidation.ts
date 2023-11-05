import { useMemo, useState } from 'react';

export interface IFormValidation {
  [key: string]: [(value: string) => boolean, string];
}

interface CheckedValidation {
  [key: string]: string | null;
}

export const useValidation = <T extends Record<keyof T, string>>(
  formState: T,
  formValidations?: IFormValidation
) => {
  const [checkedValidation, setCheckedValidation] = useState<CheckedValidation>({});

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(checkedValidation)) {
      if (checkedValidation[formValue] !== null) return false;
    }
    return true;
  }, [checkedValidation]);

  const createValidator = () => {
    const formCheckedValues: CheckedValidation = {};
    for (const formField of Object.keys(formState)) {
      const [fn, errorMessage] = formValidations?.[formField] ?? [() => true, ''];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField as keyof T])
        ? null
        : errorMessage;
    }

    setCheckedValidation(formCheckedValues);
  };

  return { isFormValid, checkedValidation, createValidator };
};
