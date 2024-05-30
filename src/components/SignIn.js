

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        if (err.response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else {
          setError('Server error. Please try again later.');
        }
      } else {
        // Network error or other issue
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
