import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        borderTop: '1px solid #eee',
        textAlign: 'center',
        fontSize: '14px',
        color: '#888'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} MinimalStore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;