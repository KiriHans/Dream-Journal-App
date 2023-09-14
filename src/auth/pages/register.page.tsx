import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/auth.layout';
import { Link as RouterLink } from 'react-router-dom';
import { IFormRegister } from '../interfaces';
import { useForm } from 'src/hooks';

export const RegisterPage = () => {
  const formRegister: IFormRegister = {
    fullName: 'John Doe',
    email: 'email@exaple.com',
    password: '********',
  };

  const { fullName, email, password, onInputChange } = useForm(formRegister);

  return (
    <AuthLayout title="Sign Up">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              name="fullName"
              type="text"
              onChange={onInputChange}
              placeholder={formRegister.fullName}
              value={fullName}
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
              fullWidth
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} alignItems="center">
              <Button variant="contained" fullWidth>
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
