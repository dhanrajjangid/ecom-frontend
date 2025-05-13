import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';

const AddressForm = ({ open, handleAddressDialogClose, editingAddressIndex, currentAddress, setCurrentAddress, handleAddressSubmit }) => {
  return (
    <Dialog open={open} onClose={handleAddressDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingAddressIndex !== null ? 'Edit Address' : 'Add Address'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Full Name"
          fullWidth
          margin="dense"
          value={currentAddress.name}
          onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
        />
        <TextField
          label="Address Line 1"
          fullWidth
          margin="dense"
          value={currentAddress.addressLine1}
          onChange={(e) => setCurrentAddress({ ...currentAddress, addressLine1: e.target.value })}
        />
        <TextField
          label="Address Line 2"
          fullWidth
          margin="dense"
          value={currentAddress.addressLine2}
          onChange={(e) => setCurrentAddress({ ...currentAddress, addressLine2: e.target.value })}
        />
        <TextField
          label="City"
          fullWidth
          margin="dense"
          value={currentAddress.city}
          onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
        />
        <TextField
          label="State"
          fullWidth
          margin="dense"
          value={currentAddress.state}
          onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
        />
        <TextField
          label="Postal Code"
          fullWidth
          margin="dense"
          value={currentAddress.postalCode}
          onChange={(e) => setCurrentAddress({ ...currentAddress, postalCode: e.target.value })}
        />
        <TextField
          label="Country"
          fullWidth
          margin="dense"
          value={currentAddress.country}
          onChange={(e) => setCurrentAddress({ ...currentAddress, country: e.target.value })}
        />
        <TextField
          label="Landmark"
          fullWidth
          margin="dense"
          value={currentAddress.landmark}
          onChange={(e) => setCurrentAddress({ ...currentAddress, landmark: e.target.value })}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="dense"
          value={currentAddress.phoneNumber}
          onChange={(e) => setCurrentAddress({ ...currentAddress, phoneNumber: e.target.value })}
        />
        <TextField
          select
          label="Address Type"
          fullWidth
          margin="dense"
          value={currentAddress.addressType}
          onChange={(e) => setCurrentAddress({ ...currentAddress, addressType: e.target.value })}
        >
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddressDialogClose}>Cancel</Button>
        <Button onClick={handleAddressSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressForm;
