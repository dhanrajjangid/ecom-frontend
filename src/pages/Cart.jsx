import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, Button, Typography, Grid, IconButton } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Typography variant="body1" sx={{ display: 'inline-block', margin: '0 8px' }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Typography variant="body2">Total: ${item.quantity * item.price}</Typography>
                  <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
