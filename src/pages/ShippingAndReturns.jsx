import React from 'react';
import { Container, Typography } from '@mui/material';

const ShippingAndReturns = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Shipping & Returns Policy
      </Typography>
      <Typography variant="h6" gutterBottom>Shipping</Typography>
      <Typography variant="body2" paragraph>
        - Dispatch Time: 1–3 business days<br/>
        - Delivery Time: 4–10 business days<br/>
        - Free shipping on orders over ₹4999; ₹499 otherwise
      </Typography>
      <Typography variant="h6" gutterBottom>Returns</Typography>
      <Typography variant="body2" paragraph>
        - Return within 7 days of delivery<br/>
        - Eligible for damaged, defective, or incorrect items<br/>
        - Refund via original payment mode within 7 working days
      </Typography>
      <Typography variant="h6" gutterBottom>Return Process</Typography>
      <Typography variant="body2">
        Email jangiddhanraj376@gmail.com with your order ID and product images. Our team will handle pickup and refund/exchange.
      </Typography>
    </Container>
  );
};

export default ShippingAndReturns;