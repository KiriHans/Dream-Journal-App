import { Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { selectUI, setMobileOpen } from 'src/store/UI/UI-slice';
type ResponsiveDrawerProps = {
  children: React.ReactNode;
  drawerWidth: number;
};

export const ResponsiveDrawer = ({ children, drawerWidth }: ResponsiveDrawerProps) => {
  const { doesMatchBreakpointSm: matches, isMobileOpen } = useAppSelector(selectUI);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!isMobileOpen));
  };

  return !matches ? (
    <Drawer
      variant="temporary"
      open={isMobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        'display': { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {children}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        'display': { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {children}
    </Drawer>
  );
};
