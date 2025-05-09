// App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';

import AdminRegisterForm from './components/AdminRegisterForm';
import AdminListPage from './components/AdminListPage';
import AdminEditPage from './components/AdminEditPage';
import AdminDeletePage from './components/AdminDeletePage';

function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Register Admin</Button>
          <Button color="inherit" component={Link} to="/admins">View Admins</Button>
          <Button color="inherit" component={Link} to="/admin-edit">Edit Admin</Button>
          <Button color="inherit" component={Link} to="/admin-delete">Delete Admin</Button>
        </Toolbar>
      </AppBar>

      <Box mt={4}>
        <Routes>
          <Route path="/" element={<AdminRegisterForm />} />
          <Route path="/admins" element={<AdminListPage />} />
          <Route path="/admin-edit" element={<AdminEditPage />} />
          <Route path="/admin-delete" element={<AdminDeletePage />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
