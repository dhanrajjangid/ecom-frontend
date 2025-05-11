import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { GiRockingChair } from "react-icons/gi";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await loginUser(email, password);
        await login(userData);
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
            Welcome to Assemble One
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Log in to manage your furniture selections
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Box textAlign="right" mt={1}>
            <Link href="#" variant="body2" underline="hover">Forgot password?</Link>
          </Box>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>

        <Typography variant="body2" align="center" mt={3}>
          Don’t have an account?{' '}
          <Link component={RouterLink} to="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
