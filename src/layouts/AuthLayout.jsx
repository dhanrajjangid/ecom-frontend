import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure full width of screen
        padding: 0,
      }}
    >
      <CssBaseline />
      <Container
        sx={{
          maxWidth: 'none', // This will remove any max width limitation
          width: '100%', // Ensures it takes the full width
          padding: 2, // Optional padding
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};


export default AuthLayout