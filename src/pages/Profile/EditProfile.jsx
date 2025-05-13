import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditProfile = ({ open, handleProfileDialogClose, profileData, setProfileData, handleProfileSubmit }) => {
  return (
    <Dialog open={open} onClose={handleProfileDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProfileDialogClose}>Cancel</Button>
        <Button onClick={handleProfileSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
