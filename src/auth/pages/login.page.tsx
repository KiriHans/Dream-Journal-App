import { Google } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/auth.layout';
import { IFormLogin } from '../interfaces';
import { useForm } from 'src/hooks';
import { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { checkingAuthentication, startGoogleSignIn } from 'src/store/auth';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const formLogin: IFormLogin = {
    email: 'email@exaple.com',
    password: '********',
  };

  const { email, password, onInputChange } = useForm(formLogin);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(checkingAuthentication(email, password));
  };

  const onGoogleSignIn = () => {
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
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" fullWidth>
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
