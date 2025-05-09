import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Box
} from '@mui/material';

const AdminListPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/administrators/')
      .then(response => {
        setAdmins(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Registered Administrators</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Registered At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map(admin => (
              <TableRow key={admin.AdministratorID}>
                <TableCell>{admin.AdministratorID}</TableCell>
                <TableCell>{admin.FirstName} {admin.LastName}</TableCell>
                <TableCell>{admin.Email}</TableCell>
                <TableCell>{admin.PhoneNumber}</TableCell>
                <TableCell>{new Date(admin.RegistrationDate).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminListPage;
