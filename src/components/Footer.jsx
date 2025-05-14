import React from 'react';
import { Box, Typography, Container, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md:6}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Elmora
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your trusted destination for quality furniture and home decor.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <MuiLink component={Link} to="/privacy" underline="hover" color="text.secondary">
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/terms" underline="hover" color="text.secondary">
                Terms & Conditions
              </MuiLink>
              <MuiLink component={Link} to="/return-shipping" underline="hover" color="text.secondary">
                Return & Shipping Policy
              </MuiLink>
              <MuiLink component={Link} to="/contact-us" underline="hover" color="text.secondary">
                Contact Us
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
            © {new Date().getFullYear()} <strong>Elmora</strong>. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
