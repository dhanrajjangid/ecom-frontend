import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { FaCheckCircle, FaTimesCircle, FaHome, FaClipboardList } from 'react-icons/fa';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const orderId = searchParams.get('order_id');
        const signature = searchParams.get('signature');

        const res = await axios.post('/api/payment/verify', {
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        });

        if (res.data.success) {
          setStatus('success');
        } else {
          setStatus('failure');
        }
      } catch (err) {
        setStatus('failure');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <Box textAlign="center" mt={10}>
      {status === 'loading' && (
        <>
          <CircularProgress color="primary" />
          <Typography mt={2}>Verifying your payment...</Typography>
        </>
      )}

      {status === 'success' && (
        <>
          <FaCheckCircle size={80} color="green" />
          <Typography variant="h5" mt={2} color="green">
            🎉 Payment Successful!
          </Typography>
          <Typography mt={1}>Thank you for shopping with us.</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<FaHome />}
              color="primary"
            >
              Go to Home
            </Button>
            <Button
              component={Link}
              to="/orders"
              variant="outlined"
              startIcon={<FaClipboardList />}
            >
              View Orders
            </Button>
          </Stack>
        </>
      )}

      {status === 'failure' && (
        <>
          <FaTimesCircle size={80} color="red" />
          <Typography variant="h5" mt={2} color="error">
            ❌ Payment Failed
          </Typography>
          <Typography mt={1}>
            Something went wrong. Please try again or contact support.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<FaHome />}
              color="primary"
            >
              Go to Home
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default PaymentStatus;
