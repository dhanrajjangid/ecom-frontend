import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%', // Full width
        margin: 0, // Remove any default margin
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container
        sx={{
          flex: 1,
          mt: 4,
          width: '100%', // Full width for content area
          maxWidth: 'none', // This removes the maxWidth limit
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};


export default MainLayout;
