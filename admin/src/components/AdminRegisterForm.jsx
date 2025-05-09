// AdminRegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/administrators/', formData);
      setMessage('Admin registered successfully!');
      setFormData({ FirstName: '', LastName: '', Email: '', Password: '', PhoneNumber: '' });
    } catch (error) {
      setMessage('Error registering admin.');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h2" align="center">Register Administrator</Typography>
      <TextField label="First Name" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
      <TextField label="Last Name" name="LastName" value={formData.LastName} onChange={handleChange} required />
      <TextField label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} required />
      <TextField label="Password" name="Password" type="password" value={formData.Password} onChange={handleChange} required />
      <TextField label="Phone Number" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required />
      <Button type="submit" variant="contained">Register</Button>
      {message && <Typography color={message.includes('successfully') ? 'green' : 'error'}>{message}</Typography>}
    </Box>
  );
};

export default AdminRegisterForm;
