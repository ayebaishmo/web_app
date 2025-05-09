import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material';

const AdminEditPage = () => {
  const [searchId, setSearchId] = useState('');
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState('');

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/administrators/${searchId}/`);
      setAdmin(response.data);
      setMessage('');
    } catch (err) {
      console.error('Error fetching admin:', err);
      setAdmin(null);
      setMessage('Admin not found or server error.');
    }
  };

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/administrators/${searchId}/`, admin);
      setMessage('Admin updated successfully!');
    } catch (err) {
      console.error('Error updating admin:', err);
      setMessage('Failed to update admin.');
    }
  };

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>Search and Edit Administrator</Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          type="number"
          label="Enter Admin ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={fetchAdmin}>Search</Button>
      </Box>

      {message && (
        <Typography color={message.includes('successfully') ? 'green' : 'error'} mb={2}>
          {message}
        </Typography>
      )}

      {admin && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleUpdate} display="flex" flexDirection="column" gap={2}>
            <TextField name="FirstName" label="First Name" value={admin.FirstName} onChange={handleChange} required />
            <TextField name="LastName" label="Last Name" value={admin.LastName} onChange={handleChange} required />
            <TextField name="Email" label="Email" type="email" value={admin.Email} onChange={handleChange} required />
            <TextField name="Password" label="Password" type="password" value={admin.Password} onChange={handleChange} required />
            <TextField name="PhoneNumber" label="Phone Number" value={admin.PhoneNumber} onChange={handleChange} required />
            <Button type="submit" variant="contained">Update Admin</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AdminEditPage;
