import React from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

const ContactUs = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        We'd love to hear from you. Fill out the form or reach out directly.
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" fullWidth required />
        <TextField label="Email" type="email" fullWidth required />
        <TextField label="Message" multiline rows={4} fullWidth required />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2">
          📧 Email: jangiddhanraj376@gmail.com<br />
          📞 Phone: +91-9685010351<br />
          📍 Address: Elmora India, 35 Suman nagar, Indore, M.P, Pin - 452010.
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactUs;