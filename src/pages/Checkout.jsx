import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle checkout (dummy logic for now)
  const handleCheckout = () => {
    // Dummy payment logic here
    alert('Payment Successful!');
    clearCart();  // Clear the cart after checkout
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      {/* Display cart items */}
      {cartItems.length > 0 ? (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price} x {item.quantity}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  ${item.price * item.quantity}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No items in the cart.</Typography>
      )}

      <Divider sx={{ margin: '20px 0' }} />

      {/* Display total price */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${totalPrice}</Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleCheckout}
        disabled={cartItems.length === 0}  // Disable button if the cart is empty
      >
        Complete Payment
      </Button>
    </Box>
  );
};

export default Checkout;
