import { Google } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/auth.layout';
import { IFormLogin } from '../interfaces';
import { IFormValidation, useForm } from 'src/hooks';
import { ChangeEvent, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { checkingAuthentication, startGoogleSignIn } from 'src/store/auth';
import { emailValidator, minimumLengthValidator } from 'src/utilities/validators';

export const LoginPage = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const formLogin: IFormLogin = {
    email: 'email@example.com',
    password: '********',
  };
  const formValidations: IFormValidation = {
    email: [emailValidator, 'Email is invalid'],
    password: [minimumLengthValidator(6), 'Email is invalid'],
  };

  const { email, password, validations, onInputChange } = useForm(formLogin, formValidations);
  const { isFormValid, checkedValidation } = validations;
  console.log(isFormValid);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAuthenticating) return;

    dispatch(checkingAuthentication(email, password));
  };

  const onGoogleSignIn = () => {
    if (isAuthenticating) return;

    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form action="" onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={onInputChange}
              placeholder={formLogin.email}
              value={email}
              error={!!checkedValidation[`emailValid`]}
              helperText={checkedValidation[`emailValid`]}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={onInputChange}
              placeholder={formLogin.password}
              value={password}
              error={!!checkedValidation[`passwordValid`]}
              helperText={checkedValidation[`passwordValid`]}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
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
        </Grid>
      </form>
    </AuthLayout>
  );
};
