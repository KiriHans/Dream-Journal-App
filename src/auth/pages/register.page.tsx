import { Alert, Button, Grid, Link, Typography } from '@mui/material';
import { AuthLayout } from '../layout/auth.layout';
import { Link as RouterLink } from 'react-router-dom';
import { IFormRegister } from '../interfaces';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { useMemo } from 'react';
import { startRegisterUserWithEmailPassword } from 'src/store/auth';
import { selectAuth } from 'src/store/journal';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'src/UI/components';
import { emailValidator } from 'src/utilities/validators';

export interface Test {
  [key: string]: string;
}

export const RegisterPage = () => {
  const { status, error } = useAppSelector(selectAuth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const dispatch = useAppDispatch();

  const defaultValues: IFormRegister = {
    displayName: '',
    email: '',
    password: '',
  };

  // const formValidations: IFormValidation = {
  //   displayName: [minimumLengthValidator(1), 'Name is required'],
  //   email: [emailValidator, 'Email is invalid'],
  //   password: [minimumLengthValidator(6), 'Password must have more than 6 character'],
  // };
  const { handleSubmit, control, formState } = useForm<IFormRegister>({
    defaultValues: defaultValues,
    mode: 'onTouched',
  });

  const { isDirty, isValid } = formState;

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = handleSubmit((data) => {
    const { displayName, email, password } = data;
    if (isAuthenticating || !isValid) return;

    dispatch(startRegisterUserWithEmailPassword({ displayName, email, password }));
  });

  return (
    <AuthLayout title="Sign Up">
      <form
        name="Login Page Form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2, animation: '3s ease-in 1s 2 reverse both paused slidein' }}
          >
            <FormInputText
              name="displayName"
              label="Full name"
              type="text"
              control={control}
              rules={{
                required: 'Name is required',
                pattern: {
                  value: /^[^0-9]+$/g,
                  message: 'Name should only have letters',
                },
                minLength: {
                  value: 3,
                  message: 'Name too short',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormInputText
              name="email"
              label="Email"
              type="Email"
              control={control}
              rules={{
                required: 'Email is required',
                validate: (value: string) => emailValidator(value) || 'Email is invalid',
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormInputText
              name="password"
              label="Password"
              type="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password is too short',
                },
              }}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} alignItems="center" display={error ? '' : 'none'}>
              <Alert severity="error">{error}</Alert>
            </Grid>
            <Grid item xs={12} alignItems="center">
              <Button
                disabled={isCheckingAuth || !isValid || !isDirty}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Do you already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
