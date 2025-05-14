// pages/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  Drawer
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaHome, FaHeart, FaUserCircle, FaShoppingCart, FaSignInAlt, FaUserPlus, FaBox } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const renderMenuItems = () => (
    <>
      <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
      <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Signup</MenuItem>
    </>
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        boxShadow: 'none',
        backgroundColor: '#fff',
      }}
    >
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
          >
            Elmora
          </Typography>

          {isMobile ? (
            <>
              {/* Cart icon near the menu button in mobile view */}
              <IconButton component={Link} to="/cart" sx={{ color: 'inherit', marginRight: '10px' }}>
                <FaShoppingCart size={22} />
              </IconButton>

              <IconButton edge="end" onClick={handleDrawerToggle} sx={{ color: 'inherit' }}>
                <FaBars size={22} />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{ width: 250, padding: 2 }}
                  role="presentation"
                  display={'flex'}
                  gap={4}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  onClick={handleDrawerToggle}
                  onKeyDown={handleDrawerToggle}
                >
                  <Button component={Link} to="/" startIcon={<FaHome />} sx={{ color: 'inherit' }}>
                    Home
                  </Button>
                  <Button component={Link} to="/categories" startIcon={<BiCategoryAlt />} sx={{ color: 'inherit' }}>
                    Categories
                  </Button>
                  <Button component={Link} to="/wishlist" startIcon={<FaHeart />} sx={{ color: 'inherit' }}>
                    Wishlist
                  </Button>
                  <Button component={Link} to="/orders" startIcon={<FaBox />} sx={{ color: 'inherit' }}>
                    Orders
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <Button component={Link} to="/profile" startIcon={<FaUserCircle />} sx={{ color: 'inherit' }}>
                        Profile
                      </Button>
                      <Button onClick={logout} sx={{ color: 'inherit' }}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button component={Link} to="/login" startIcon={<FaSignInAlt />} sx={{ color: 'inherit' }}>
                        Login
                      </Button>
                      <Button component={Link} to="/signup" startIcon={<FaUserPlus />} sx={{ color: 'inherit' }}>
                        Signup
                      </Button>
                    </>
                  )}
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={Link} to="/" startIcon={<FaHome />} sx={{ color: 'inherit' }}>
                Home
              </Button>
              <Button component={Link} to="/categories" startIcon={<BiCategoryAlt />} sx={{ color: 'inherit' }}>
                Categories
              </Button>
              <Button component={Link} to="/wishlist" startIcon={<FaHeart />} sx={{ color: 'inherit' }}>
                Wishlist
              </Button>

              <SearchBar /> {/* ✅ Search bar with dropdown suggestions */}

              {isAuthenticated ? (
                <>
                  <IconButton component={Link} to="/profile" sx={{ color: 'inherit' }}>
                    <FaUserCircle size={22} />
                  </IconButton>
                  <IconButton component={Link} to="/cart" sx={{ color: 'inherit', marginLeft: '15px' }}>
                    <FaShoppingCart size={22} />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" startIcon={<FaSignInAlt />} sx={{ color: 'inherit' }}>
                    Login
                  </Button>
                  <Button component={Link} to="/signup" startIcon={<FaUserPlus />} sx={{ color: 'inherit' }}>
                    Signup
                  </Button>
                </>
              )}
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
