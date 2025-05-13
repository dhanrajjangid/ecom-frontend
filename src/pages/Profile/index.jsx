import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PasswordForm from './PasswordForm';
import AddressForm from './AddressForm';
import EditProfile from './EditProfile';
import ProfileCard from './ProfileCard';
import AddressList from './AddressList';
import { addNewAddress, getAddressList } from '../../services/profileService';

const initialAddress = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    landmark: '',
    phoneNumber: '',
    addressType: 'Home',
    isPrimary: false,
};

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [editingAddressIndex, setEditingAddressIndex] = useState(null);

    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '',
    });

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [addressList, setAddressList] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(initialAddress);

    const handleProfileDialogClose = () => setOpenProfileDialog(false);

    const handleAddressDialogOpen = (index = null) => {
        if (index !== null) {
            setCurrentAddress(addressList[index]);
            setEditingAddressIndex(index);
        } else {
            setCurrentAddress(initialAddress);
            setEditingAddressIndex(null);
        }
        setOpenAddressDialog(true);
    };

    const handleAddressDialogClose = () => {
        setOpenAddressDialog(false);
        setCurrentAddress(initialAddress);
        setEditingAddressIndex(null);
    };

    const handlePasswordDialogClose = () => {
        setOpenPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleProfileSubmit = () => {
        setOpenProfileDialog(false);
    };

    const handleAddressDelete = (index) => {
        const newList = [...addressList];
        newList.splice(index, 1);
        setAddressList(newList);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddressSubmit = async () => {
        try {
          if (editingAddressIndex !== null) {
            const updatedList = [...addressList];
            updatedList[editingAddressIndex] = currentAddress;
            setAddressList(updatedList);
          } else {
            const newAddress = {
              ...currentAddress,
              userId: user._id,
              isPrimary: addressList.length === 0 ? true : false,
            };
            const res = await addNewAddress(newAddress);
            setAddressList((prev) => [...prev, res]);
          }
          handleAddressDialogClose();
        } catch (error) {
          console.error('Error adding address:', error);
        }
      };
      

    const fetchAddresses = async () => {
        try {
          const res = await getAddressList(user._id);
          setAddressList(res);
        } catch (error) {
          console.error('Failed to fetch addresses', error);
        }
    };

    useEffect(() => {
        if (!user?._id) return;
        fetchAddresses();
      }, [user]);
      

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={4}>
                {/* Profile Card */}
                <Grid item size={{ xs: 12, sm: 4 }}>
                    <ProfileCard
                        profileData={profileData}
                        handleProfileDialogOpen={() => setOpenProfileDialog(true)}
                        handlePasswordDialogOpen={() => setOpenPasswordDialog(true)}
                        handleLogout={handleLogout}
                    />
                </Grid>

                {/* Address Section */}
                <Grid item size={{ xs: 12, md: 8 }}>
                    <AddressList
                        addressList={addressList}
                        handleAddressDialogOpen={handleAddressDialogOpen}
                        handleAddressDelete={handleAddressDelete}
                    />
                </Grid>
            </Grid>

            {/* Profile Dialog */}
            <EditProfile
                open={openProfileDialog}
                handleProfileDialogClose={handleProfileDialogClose}
                profileData={profileData}
                setProfileData={setProfileData}
                handleProfileSubmit={handleProfileSubmit}
            />

            {/* Address Dialog */}
            <AddressForm
                open={openAddressDialog}
                handleAddressDialogClose={handleAddressDialogClose}
                editingAddressIndex={editingAddressIndex}
                currentAddress={currentAddress}
                setCurrentAddress={setCurrentAddress}
                handleAddressSubmit={handleAddressSubmit}
            />

            {/* Password Dialog */}
            <PasswordForm
                open={openPasswordDialog}
                handlePasswordDialogClose={handlePasswordDialogClose}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
            />
        </Box>
    );
};

export default ProfilePage;
