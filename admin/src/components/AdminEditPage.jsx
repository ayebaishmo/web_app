import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Search and Edit Administrator</h2>

      {/* Search Input */}
      <div>
        <input
          type="number"
          placeholder="Enter Admin ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={fetchAdmin}>Search</button>
      </div>

      {message && <p>{message}</p>}

      {/* Editable Form */}
      {admin && (
        <form onSubmit={handleUpdate}>
          <input name="FirstName" value={admin.FirstName} onChange={handleChange} required />
          <input name="LastName" value={admin.LastName} onChange={handleChange} required />
          <input name="Email" value={admin.Email} onChange={handleChange} type="email" required />
          <input name="Password" value={admin.Password} onChange={handleChange} type="password" required />
          <input name="PhoneNumber" value={admin.PhoneNumber} onChange={handleChange} required />
          <button type="submit">Update Admin</button>
        </form>
      )}
    </div>
  );
};

export default AdminEditPage;
