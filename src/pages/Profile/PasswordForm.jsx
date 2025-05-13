import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const PasswordForm = ({ open, handlePasswordDialogClose, passwordData, setPasswordData }) => {
  return (
    <Dialog open={open} onClose={handlePasswordDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePasswordDialogClose}>Cancel</Button>
        <Button onClick={() => { handlePasswordDialogClose(); }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordForm;
