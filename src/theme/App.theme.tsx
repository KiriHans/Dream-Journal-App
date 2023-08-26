import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from '.';
import React from 'react';

type AppThemeProps = {
  children: React.ReactNode;
};

export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};
