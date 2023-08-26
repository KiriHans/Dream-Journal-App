import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/auth.layout';
import { Link as RouterLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Full name" type="text" placeholder="John Doe" fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@example.com"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Password" type="password" placeholder="******" fullWidth></TextField>
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
