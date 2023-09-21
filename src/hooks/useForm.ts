import { useState, ChangeEvent, useEffect } from 'react';
import { IFormValidation, useValidation } from '.';

export const useForm = <T extends Record<keyof T, string>>(
  initialForm: T,
  formValidations: IFormValidation
) => {
  const [formState, setFormState] = useState(initialForm);
  const { isFormValid, checkedValidation, createValidator } = useValidation<T>(
    formState,
    formValidations
  );

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const onResetForm = () => {
    setFormState(initialForm);
  };

  useEffect(() => {
    createValidator();
  }, [formState, createValidator]);

  return {
    ...formState,
    formState,
    validations: {
      isFormValid,
      checkedValidation,
    },
    onInputChange,
    onResetForm,
  };
};
