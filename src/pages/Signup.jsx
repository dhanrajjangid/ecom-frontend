import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { GiRockingChair } from "react-icons/gi";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/authService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(name, email, password);
      await login(userData.email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#ffffff" px={2}>
      <Box width="100%" maxWidth={400}>
        <Box textAlign="center" mb={4}>
          <GiRockingChair fontSize="large" color="primary" />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Assemble One
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start furnishing your dream space
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>

        <Typography variant="body2" align="center" mt={3}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
