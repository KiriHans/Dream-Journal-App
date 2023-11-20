import { BaseTextFieldProps } from '@mui/material';
import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export interface FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseTextFieldProps {
  name: TName;
  control: Control<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
