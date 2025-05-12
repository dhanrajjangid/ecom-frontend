import React, { useState } from 'react';
import {
  Container, Grid, Typography, Avatar, Button, Divider, Box, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, Paper
} from '@mui/material';
import { FaUser, FaHistory, FaAddressCard, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '',
  });

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleProfileDialogOpen = () => setOpenProfileDialog(true);
  const handleProfileDialogClose = () => setOpenProfileDialog(false);

  const handleAddressDialogOpen = () => setOpenAddressDialog(true);
  const handleAddressDialogClose = () => setOpenAddressDialog(false);

  const handleProfileSubmit = () => {
    setOpenProfileDialog(false);
  };

  const handleAddressSubmit = () => {
    setOpenAddressDialog(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item size={{xs: 12, sm:4}}>
          <Paper elevation={4} sx={{ p: 3, background: '#fefefe', borderRadius: 3 }}>
            <Box textAlign="center">
              <Avatar
                alt="User Avatar"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">{profileData.name}</Typography>
              <Typography variant="body2" color="text.secondary">{profileData.email}</Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Button
              fullWidth
              variant="contained"
              onClick={handleProfileDialogOpen}
              sx={{
                mb: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              }}
            >
              Edit Profile
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': {
                  backgroundColor: '#E3F2FD'
                }
              }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>

        {/* Account Overview */}
        <Grid item size={{xs: 12, md: 8}}>
          <Paper elevation={4} sx={{ p: 3, background: '#fafafa', borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Account Overview
            </Typography>

            <Grid container spacing={8} flexDirection={'column'}>
             <Grid container spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FaHistory />}
                  onClick={() => navigate('/orders')}
                  sx={{
                    py: 2,
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: '500',
                    borderColor: '#90caf9',
                    color: '#0d47a1',
                    '&:hover': {
                      borderColor: '#64b5f6',
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
                  Order History
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FaAddressCard />}
                  onClick={handleAddressDialogOpen}
                  sx={{
                    py: 2,
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: '500',
                    borderColor: '#a5d6a7',
                    color: '#1b5e20',
                    '&:hover': {
                      borderColor: '#81c784',
                      backgroundColor: '#e8f5e9',
                    },
                  }}
                >
                  Address
                </Button>
                </Grid>
                <Grid container spacing={2}>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FaSignOutAlt />}
                  onClick={handleLogout}
                  sx={{
                    py: 2,
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: '500',
                    borderColor: '#ef9a9a',
                    color: '#b71c1c',
                    '&:hover': {
                      borderColor: '#e57373',
                      backgroundColor: '#ffebee',
                    },
                  }}
                >
                  Logout
                </Button>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Profile Dialog */}
      <Dialog open={openProfileDialog} onClose={handleProfileDialogClose} fullWidth maxWidth="sm">
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
          <Button onClick={handleProfileDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleProfileSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Address Dialog */}
      <Dialog open={openAddressDialog} onClose={handleAddressDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          <TextField
            label="Street"
            variant="outlined"
            fullWidth
            margin="normal"
            value={addressData.street}
            onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={addressData.city}
            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            value={addressData.state}
            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
          />
          <TextField
            label="ZIP Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={addressData.zip}
            onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddressDialogClose}>Cancel</Button>
          <Button onClick={handleAddressSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
