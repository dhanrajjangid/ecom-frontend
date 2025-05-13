import React from 'react';
import { Paper, Box, Avatar, Typography, Divider, Button } from '@mui/material';
import { FaUnlockAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({
  profileData,
  handleProfileDialogOpen,
  handlePasswordDialogOpen,
  handleLogout,
}) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={4} sx={{ p: 3, background: '#fefefe', borderRadius: 3 }}>
      <Box textAlign="center">
        <Avatar
          alt="User Avatar"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h5" fontWeight="bold">
          {profileData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profileData.email}
        </Typography>
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
        startIcon={<FaUnlockAlt />}
        onClick={handlePasswordDialogOpen}
        sx={{
          mb: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          borderColor: '#2196F3',
          color: '#2196F3',
          '&:hover': {
            backgroundColor: '#E3F2FD',
          },
        }}
      >
        Change Password
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<FaHistory />}
        onClick={() => navigate('/orders')}
        sx={{
          mb: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          borderColor: '#2196F3',
          color: '#2196F3',
          '&:hover': {
            backgroundColor: '#E3F2FD',
          },
        }}
      >
        Order History
      </Button>

      <Button
        fullWidth
        variant="outlined"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          borderColor: '#ef9a9a',
          color: '#b71c1c',
          '&:hover': {
            backgroundColor: '#FFEBEE',
          },
        }}
        onClick={handleLogout}
        startIcon={<FaSignOutAlt />}
      >
        Logout
      </Button>
    </Paper>
  );
};

export default ProfileCard;
