import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getOrderDetails } from '../services/cartService';
import { getAddresses, addAddress } from '../services/addressService';
import RazorpayButton from '../components/RazorpayButton';
import AddressForm from './Profile/AddressForm';

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
  const [currentAddress, setCurrentAddress] = useState(initialAddressState);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);

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

  const handleAddressDialogOpen = () => {
    setCurrentAddress(initialAddressState);
    setOpenAddressDialog(true);
  };

  const handleAddressDialogClose = () => {
    setOpenAddressDialog(false);
  };

  const handleAddressSubmit = async () => {
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
          <Box display={"flex"} flexDirection={"column"} alignItems={'flex-start'}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              {/* <FormLabel component="legend">Select Address</FormLabel> */}
              <RadioGroup
                value={selectedAddressId}
                onChange={(e) => setSelectedAddressId(e.target.value)}
              >
                {addresses.map((addr) => (
                  <FormControlLabel
                    key={addr._id}
                    value={addr._id}
                    control={<Radio />}
                    label={`${addr.name}, ${addr.addressLine1}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button onClick={handleAddressDialogOpen} >Use a new address</Button>
          </Box>
        )}


        <AddressForm
          open={openAddressDialog}
          handleAddressDialogClose={handleAddressDialogClose}
          editingAddressIndex={null}
          currentAddress={currentAddress}
          setCurrentAddress={setCurrentAddress}
          handleAddressSubmit={handleAddressSubmit}
        />
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
          <RazorpayButton user={user} addressId={selectedAddressId} amount={orderDetails.total} />
        </Paper>
      ) : (
        <Typography>No cart data available.</Typography>
      )}
    </Box>
  );
};

export default Checkout;
