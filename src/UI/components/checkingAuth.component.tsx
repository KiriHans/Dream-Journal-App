import { CircularProgress, Grid } from '@mui/material';

type CheckingAuthProps = {
  withBackground?: boolean;
  minHeight?: string;
};

export const CheckingAuth = ({ withBackground = true, minHeight = '100vh' }: CheckingAuthProps) => {
  const backgroundProperties = withBackground
    ? {
        backgroundColor: '#000000',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23080711' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%230f0e22' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23171432' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%231e1b43' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23262254' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};
  return (
    <Grid
      className="normality"
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight,
        ...backgroundProperties,
      }}
    >
      <Grid item>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
