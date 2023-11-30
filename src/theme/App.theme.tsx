import { CssBaseline, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { purpleTheme } from '.';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { updateBreakpoint } from 'src/store/UI/UI-slice';

type AppThemeProps = {
  children: React.ReactNode;
};

export const AppTheme = ({ children }: AppThemeProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateBreakpoint({ matches }));
  }, [matches]);
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};
