import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PasswordForm from './PasswordForm';
import AddressForm from './AddressForm';
import EditProfile from './EditProfile';
import ProfileCard from './ProfileCard';
import AddressList from './AddressList';

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
    const { logout } = useAuth();
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

    const handleAddressSubmit = () => {
        if (editingAddressIndex !== null) {
            const updatedList = [...addressList];
            updatedList[editingAddressIndex] = currentAddress;
            setAddressList(updatedList);
        } else {
            if (addressList.length === 0) {
                setCurrentAddress({ ...currentAddress, isPrimary: true });
            }
            setAddressList([...addressList, currentAddress]);
        }
        handleAddressDialogClose();
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
