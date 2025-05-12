import React from 'react';
import { Button } from '@mui/material';
import { createPaymentOrder } from '../services/cartService';

const RazorpayButton = ({ user, amount }) => {

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert('Razorpay SDK failed to load.');

    try {
      const order = await createPaymentOrder({ userId: user._id });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Assemble One',
        description: 'Furniture Order Payment',
        image: "https://example.com/your_logo",
        order_id: order.orderId,
        callback_url: `https://assembleone.netlify.app/payment-status${order.orderId}`,
      
        prefill: {
          name: user.name,
          email: user.email,
          contact: '9000090000',
        },
        notes: {
        "address": "Razorpay Corporate Office"
        },
        theme: {
          color: '#0f172a',
        },
      };

      console.log(options)

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handlePayment}>
      Pay ₹{amount}
    </Button>
  );
};

export default RazorpayButton;
