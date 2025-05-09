import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

const AdminDeletePage = () => {
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
      setMessage('Admin not found.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete admin #${searchId}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/administrators/${searchId}/`);
      setMessage(`Administrator #${searchId} deleted successfully.`);
      setAdmin(null);
    } catch (err) {
      console.error('Error deleting admin:', err);
      setMessage('Failed to delete administrator.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search and Delete Administrator
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Enter Admin ID"
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchAdmin}
          >
            Search
          </Button>
        </Box>
        {message && <Typography color="secondary">{message}</Typography>}
      </Paper>

      {admin && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Admin Info:</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Name:</strong> {admin.FirstName} {admin.LastName}</Typography>
          <Typography><strong>Email:</strong> {admin.Email}</Typography>
          <Typography><strong>Phone:</strong> {admin.PhoneNumber}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete Admin
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AdminDeletePage;
