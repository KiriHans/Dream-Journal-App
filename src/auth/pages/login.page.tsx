import { Google } from '@mui/icons-material';
import { Button, Grid, Typography, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/auth.layout';
import { IFormLogin } from '../interfaces';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { startGoogleSignIn, startLoginUserWithEmailPassword } from 'src/store/auth';
import { CheckingAuth } from 'src/UI/components';
import { selectAuth } from 'src/store/journal';
import { FormInputText } from 'src/UI/components';
import { emailValidator } from 'src/utilities/validators';

export const LoginPage = () => {
  const { status, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const defaultValues: IFormLogin = {
    email: '',
    password: '',
  };

  const { handleSubmit, control, formState } = useForm<IFormLogin>({
    defaultValues: defaultValues,
    mode: 'onTouched',
  });

  const { isDirty, isValid } = formState;

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    if (isAuthenticating || !isValid) return;

    dispatch(startLoginUserWithEmailPassword({ email, password }));
  });

  const onGoogleSignIn = () => {
    if (isAuthenticating || !isValid) return;

    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        action=""
        onSubmit={onSubmit}
        className="normality animate__animated animate__fadeIn animate__faster"
        autoComplete="on"
      >
        <Grid container>
          {isAuthenticating ? (
            <CheckingAuth withBackground={false} minHeight="20vh" />
          ) : (
            <>
              <Grid item xs={12}>
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
                <Grid item xs={12} sm={6}>
                  <Button
                    disabled={isAuthenticating || !isValid || !isDirty}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    disabled={isAuthenticating || !isValid || !isDirty}
                    onClick={onGoogleSignIn}
                    variant="contained"
                    fullWidth
                  >
                    <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="end">
                <Link component={RouterLink} color="inherit" to="/auth/register">
                  Create account
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </AuthLayout>
  );
};
