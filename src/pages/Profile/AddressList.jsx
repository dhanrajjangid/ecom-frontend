import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddressList = ({
  addressList = [],
  handleAddressDialogOpen,
  handleAddressDelete
}) => {
  return (
    <Paper elevation={4} sx={{ p: 3, background: '#fafafa', borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Saved Addresses
      </Typography>

      {addressList?.length === 0 ? (
        <Typography color="text.secondary" mb={2}>
          No addresses added.
        </Typography>
      ) : (
        addressList?.map((addr, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              position: 'relative'
            }}
          >
            <Typography fontWeight="bold">
              {addr.name} ({addr.addressType})
            </Typography>
            <Typography>
              {addr.addressLine1}, {addr.addressLine2}
            </Typography>
            <Typography>
              {addr.city}, {addr.state} - {addr.postalCode}
            </Typography>
            <Typography>
              {addr.country} | Phone: {addr.phoneNumber}
            </Typography>
            {addr.landmark && <Typography>Landmark: {addr.landmark}</Typography>}
            {addr.isPrimary && (
              <Typography fontSize={12} color="green">
                Primary Address
              </Typography>
            )}
            <Box position="absolute" top={10} right={10}>
              <IconButton onClick={() => handleAddressDialogOpen(index)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => handleAddressDelete(index)} sx={{ ml: 1 }}>
                <FaTrash />
              </IconButton>
            </Box>
          </Box>
        ))
      )}

      <Button
        variant="outlined"
        onClick={() => handleAddressDialogOpen()}
        sx={{ textTransform: 'none', fontWeight: 'bold', mt: 2 }}
      >
        Add New Address
      </Button>
    </Paper>
  );
};

export default AddressList;
