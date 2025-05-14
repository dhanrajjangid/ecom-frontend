import React from 'react';
import { Container, Typography } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Elmora! These Terms govern your use of our website and services.
      </Typography>
      <Typography variant="h6" gutterBottom>Use of Website</Typography>
      <Typography variant="body2" paragraph>
        By accessing this website, you agree to comply with these terms and applicable laws.
      </Typography>
      <Typography variant="h6" gutterBottom>Orders and Payments</Typography>
      <Typography variant="body2" paragraph>
        Orders are confirmed after successful payment. We reserve the right to cancel orders due to product unavailability or errors.
      </Typography>
      <Typography variant="h6" gutterBottom>Intellectual Property</Typography>
      <Typography variant="body2" paragraph>
        All content is owned by Elmora or used under license.
      </Typography>
      <Typography variant="h6" gutterBottom>Limitation of Liability</Typography>
      <Typography variant="body2">
        Elmora is not liable for any indirect damages from use of our services.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
