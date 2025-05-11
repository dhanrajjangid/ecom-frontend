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
  InputBase,
  Drawer
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaHome, FaHeart, FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa'; // react-icons
import { BiCategoryAlt } from 'react-icons/bi'; // Category icon import

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Add search logic or redirection for search results here
    console.log("Search query:", searchQuery);
  };

  const renderMenuItems = () => {
   
    return (
      <>
        <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
        <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Signup</MenuItem>
      </>
    );
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        boxShadow: 'none',
        backgroundColor: '#fff',
      }}
    >      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
          >
            Assemble One
          </Typography>

          {isMobile ? (
            <>
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
                  {isAuthenticated ? (
                    <>
                      <Button component={Link} to="/profile" startIcon={<FaUserCircle />} sx={{ color: 'inherit' }}>
                        Profile
                      </Button>
                      <Button component={Link} to="/orders" sx={{ color: 'inherit' }}>Orders</Button>
                    </>
                  ) : (
                    <>
                      <Button component={Link} to="/login" sx={{ color: 'inherit' }}>Login</Button>
                      <Button component={Link} to="/signup" sx={{ color: 'inherit' }}>Signup</Button>
                    </>
                  )}
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button component={Link} to="/" startIcon={<FaHome />} sx={{ color: 'inherit' }}>
                Home
              </Button>
              <Button component={Link} to="/categories" startIcon={<BiCategoryAlt />} sx={{ color: 'inherit' }}>
                Categories
              </Button>
              <Button component={Link} to="/wishlist" startIcon={<FaHeart />} sx={{ color: 'inherit' }}>
                Wishlist
              </Button>

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
                  <Button component={Link} to="/login" sx={{ color: 'inherit' }}>Login</Button>
                  <Button component={Link} to="/signup" sx={{ color: 'inherit' }}>Signup</Button>
                </>
              )}

              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                <InputBase
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  sx={{
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    width: '200px',
                  }}
                />
                <IconButton type="submit" sx={{ padding: '10px' }}>
                  <FaSearch />
                </IconButton>
              </form>
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
