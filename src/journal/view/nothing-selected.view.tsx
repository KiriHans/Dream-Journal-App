import { StarOutline } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Paper
      className="animate__animated animate__fadeIn animate__faster"
      elevation={2}
      sx={{
        minHeight: `calc(100vh - 110px)`,
        borderRadius: 4,
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: `calc(100vh - 110px)`,
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid item xs={12}>
          <StarOutline sx={{ fontSize: 100, color: 'primary.main' }} />
        </Grid>
        <Grid item xs={12} className="animate__animated animate__zoomIn animate__faster">
          <Typography color="primary.main" variant="h5">
            Select or create your journal entry
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
