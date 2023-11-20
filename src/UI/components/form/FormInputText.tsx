import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FormInputProps } from 'src/UI/interfaces/FormInputProps';

export const FormInputText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  type,
  rules,
  ...text
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error, invalid } }) => (
        <TextField
          {...field}
          helperText={error ? error.message : null}
          error={!!error && invalid}
          type={type}
          label={label}
          {...text}
          fullWidth
        />
      )}
    />
  );
};
