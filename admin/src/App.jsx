import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminRegisterForm from './components/AdminRegisterForm';
import AdminListPage from './components/AdminListPage';
import AdminEditPage from './components/AdminEditPage';
import AdminDeletePage from './components/AdminDeletePage';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Register Admin</Link> | <Link to="/admins">View Admins</Link> | <Link to="/admin-edit">Edit Admin</Link> | <Link to="/admin-delete">Delete Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AdminRegisterForm />} />
        <Route path="/admins" element={<AdminListPage />} />
        <Route path="/admin-edit" element={<AdminEditPage />} />
        <Route path="/admin-delete" element={<AdminDeletePage />} />
      </Routes>
    </div>
  );
}

export default App;
