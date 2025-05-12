import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, Button, Typography, Grid, IconButton, Divider, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FaTrash, FaShippingFast } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.productId?.salePrice * item.quantity, 0);
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Shopping Bag
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 2 }}>
        {cartItems.length} items in your bag
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
              <Typography variant="h6" color="textSecondary">
                Your cart is empty. Start shopping to add items!
              </Typography>
            </Box>
          ) : (
            <>
             {cartItems.map((item) => (
  <Paper
    key={item.id}
    sx={{
      padding: 2,
      borderRadius: 2,
      boxShadow: 2,
      marginBottom: 2,
    }}
  >
    <Grid container spacing={2} alignItems="center">
      {/* Image */}
      <Grid size={{ xs: 12, md: 2 }}>
        <Box
          component="img"
          src={item.productId?.thumbnail}
          alt={item.productId?.name}
          sx={{
            width: '100%',
            height: 100,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      </Grid>

      {/* Product Info */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          {item.productId?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ₹{item.productId?.salePrice}
        </Typography>
      </Grid>

      {/* Quantity & Actions */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleQuantityChange(item.productId?._id, item.quantity - 1)}
            sx={{ minWidth: '30px', fontSize: '16px' }}
          >
            -
          </Button>
          <Typography variant="body1" fontWeight="bold">
            {item.quantity}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleQuantityChange(item.productId?._id, item.quantity + 1)}
            sx={{ minWidth: '30px', fontSize: '16px' }}
          >
            +
          </Button>
          <Typography variant="body2" fontWeight="bold">
            Total: ₹{item.quantity * Number(item.productId?.salePrice)}
          </Typography>
          <IconButton color="error" onClick={() => removeFromCart(item.id)}>
            <FaTrash />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  </Paper>
))}

            </>
          )}
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Cart Total
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Cart Subtotal</Typography>
              <Typography variant="body1">₹{calculateTotalPrice()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">Free</Typography>
            </Box>
            {/* Add Discount if applicable */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <Typography variant="h6">Cart Total</Typography>
              <Typography variant="h6">₹{calculateTotalPrice()}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: '10px 20px', fontWeight: 'bold' }}
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          <FaShippingFast style={{ marginRight: 4 }} />
          Free shipping on orders over ₹5000.
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;