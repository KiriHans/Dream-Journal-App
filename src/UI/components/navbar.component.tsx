import { HomeOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { selectUI, setMobileOpen } from 'src/store/UI/UI-slice';
import { startLogout } from 'src/store/auth';
import { clearActiveNote } from 'src/store/journal';

type NavBarProps = {
  drawerWidth: number;
};

export const NavBar = ({ drawerWidth = 240 }: NavBarProps) => {
  const { isMobileOpen } = useAppSelector(selectUI);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!isMobileOpen));
  };

  const onNothingView = () => {
    dispatch(clearActiveNote());
    navigate('/journal');
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      className="navbar"
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap component="div">
            {' '}
            Journal Dream App{' '}
          </Typography>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            justifyItems="flex-end"
            flexWrap="wrap"
          >
            <IconButton sx={{ color: 'white' }} onClick={onNothingView}>
              <HomeOutlined />
            </IconButton>
            <IconButton color="error" onClick={onLogout}>
              <LogoutOutlined />
            </IconButton>
          </Stack>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
