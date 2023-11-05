import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/auth.layout';
import { Link as RouterLink } from 'react-router-dom';
import { IFormRegister } from '../interfaces';
import { IFormValidation, useForm } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { ChangeEvent, useMemo, useState } from 'react';
import { emailValidator, minimumLengthValidator } from 'src/utilities/validators';
import { startRegisterUserWithEmailPassword } from 'src/store/auth';

export interface Test {
  [key: string]: string;
}

export const RegisterPage = () => {
  const { status, error } = useAppSelector((state) => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const dispatch = useAppDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);

  const formRegister: IFormRegister = {
    displayName: 'John Doe',
    email: 'email@example.com',
    password: '********',
  };

  const formValidations: IFormValidation = {
    displayName: [minimumLengthValidator(1), 'Name is required'],
    email: [emailValidator, 'Email is invalid'],
    password: [minimumLengthValidator(6), 'Password must have more than 6 character'],
  };
  const { displayName, email, password, validations, onInputChange } = useForm(
    formRegister,
    formValidations
  );

  const { isFormValid, checkedValidation } = validations;

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAuthenticating && !isFormValid) return;

    setformSubmitted(true);

    dispatch(startRegisterUserWithEmailPassword({ displayName, email, password }));
  };

  return (
    <AuthLayout title="Sign Up">
      <form
        onSubmit={onSubmit}
        className="normality animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2, animation: '3s ease-in 1s 2 reverse both paused slidein' }}
          >
            <TextField
              label="Full name"
              name="displayName"
              type="text"
              onChange={onInputChange}
              placeholder={formRegister.displayName}
              value={displayName}
              error={!!checkedValidation[`displayNameValid`] && formSubmitted}
              helperText={checkedValidation[`displayNameValid`]}
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={onInputChange}
              placeholder={formRegister.email}
              value={email}
              error={!!checkedValidation[`emailValid`] && formSubmitted}
              helperText={checkedValidation[`emailValid`]}
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={onInputChange}
              placeholder={formRegister.password}
              value={password}
              error={!!checkedValidation[`passwordValid`] && formSubmitted}
              helperText={checkedValidation[`passwordValid`]}
              fullWidth
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} alignItems="center" display={error ? '' : 'none'}>
              <Alert severity="error">{error}</Alert>
            </Grid>
            <Grid item xs={12} alignItems="center">
              <Button disabled={isCheckingAuth} type="submit" variant="contained" fullWidth>
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
