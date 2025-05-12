import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getOrderDetails } from '../services/cartService';
import { getAddresses, addAddress } from '../services/addressService';
import RazorpayButton from '../components/RazorpayButton';

const initialAddressState = {
  name: '',
  mobile: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  addressType: 'Home', // Default type
};

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const [orderDetails, setOrderDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(initialAddressState);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userId = user?._id;
        if (cartItems.length > 0 && userId) {
          const [orderRes, addressRes] = await Promise.all([
            getOrderDetails({ userId }),
            getAddresses(userId),
          ]);
          setOrderDetails(orderRes);
          setAddresses(addressRes);
          if (addressRes.length > 0) {
            setSelectedAddressId(addressRes[0]._id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchInitialData();
  }, [cartItems, user]);

  const handleAddAddress = async () => {
    try {
      const saved = await addAddress({ ...newAddress, userId: user._id });
      setAddresses((prev) => [...prev, saved]);
      setSelectedAddressId(saved._id);
      setUseNewAddress(false);
      setNewAddress(initialAddressState);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      {/* Address Selection */}
      <Paper sx={{ padding: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>

        {!useNewAddress && (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Address</InputLabel>
              <Select
                value={selectedAddressId}
                label="Select Address"
                onChange={(e) => setSelectedAddressId(e.target.value)}
              >
                {addresses.map((addr) => (
                  <MenuItem key={addr._id} value={addr._id}>
                    {addr.name}, {addr.addressLine1}, {addr.city}, {addr.state} - {addr.postalCode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={() => setUseNewAddress(true)}>Use a new address</Button>
          </>
        )}

        {useNewAddress && (
          <Box>
            <TextField
              label="Full Name"
              name="name"
              value={newAddress.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={newAddress.mobile}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={newAddress.addressLine1}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={newAddress.addressLine2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Address Type</InputLabel>
              <Select
                value={newAddress.addressType}
                name="addressType"
                onChange={handleChange}
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" onClick={handleAddAddress}>
                Save Address
              </Button>
              <Button variant="outlined" onClick={() => setUseNewAddress(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Order Summary */}
      {orderDetails ? (
        <Paper sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {orderDetails.items.map((item, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>
                {item.name} × {item.quantity}
              </Typography>
              <Typography>₹{item.total}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal</Typography>
            <Typography>₹{orderDetails.subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tax</Typography>
            <Typography>₹{orderDetails.tax || 0}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Shipping</Typography>
            <Typography>₹{orderDetails.shipping || 0}</Typography>
          </Box>
          {orderDetails.discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Discount</Typography>
              <Typography color="success.main">-₹{orderDetails.discount || 0}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">₹{orderDetails.total}</Typography>
          </Box>
          <RazorpayButton user={user} amount={orderDetails.total} />
        </Paper>
      ) : (
        <Typography>No cart data available.</Typography>
      )}
    </Box>
  );
};

export default Checkout;
