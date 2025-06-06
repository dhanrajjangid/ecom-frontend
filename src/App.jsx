import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
