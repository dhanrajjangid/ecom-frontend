import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaClipboardList,
} from 'react-icons/fa';
import { checkPaymentStatus } from '../services/cartService';

const PaymentStatus = () => {
  const { id: orderId } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await checkPaymentStatus(orderId);
        if (res.success && res.status === 'paid') {
          setStatus('success');
        } else {
          setStatus('failure');
        }
      } catch (err) {
        setStatus('failure');
      }
    };

    if (orderId) fetchPaymentStatus();
    else setStatus('failure');
  }, [orderId]);

  return (
    <Box textAlign="center" mt={10}>
      {status === 'loading' && (
        <>
          <CircularProgress color="primary" />
          <Typography mt={2}>Checking payment status...</Typography>
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
            We couldn’t verify your payment. Please contact support if you’ve already paid.
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
