import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        At Elmora, your privacy is our priority. This policy explains how we collect, use,
        and protect your personal data when you use our website.
      </Typography>
      <Typography variant="h6" gutterBottom>Information We Collect</Typography>
      <Typography variant="body2" paragraph>
        - Personal Info: Name, email, address, phone number<br/>
        - Order Details: Shipping and billing info<br/>
        - Payment Info: Processed securely via third-party gateways<br/>
        - Device Info: IP address, browser, OS (for analytics)<br/>
        - Cookies: To improve site functionality and track preferences
      </Typography>
      <Typography variant="h6" gutterBottom>How We Use It</Typography>
      <Typography variant="body2" paragraph>
        To fulfill orders, communicate updates, improve website performance, and prevent fraud.
      </Typography>
      <Typography variant="h6" gutterBottom>Your Rights</Typography>
      <Typography variant="body2" paragraph>
        You may access, update, or delete your data and opt out of marketing at any time.
      </Typography>
      <Typography variant="h6" gutterBottom>Contact</Typography>
      <Typography variant="body2">
        Email: jangiddhanraj376@gmail.com | Phone: +91-9685010351
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;