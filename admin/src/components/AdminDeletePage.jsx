import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Search and Delete Administrator</h2>

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

      {admin && (
        <div>
          <h3>Admin Info:</h3>
          <p><strong>Name:</strong> {admin.FirstName} {admin.LastName}</p>
          <p><strong>Email:</strong> {admin.Email}</p>
          <p><strong>Phone:</strong> {admin.PhoneNumber}</p>
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>
            Delete Admin
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDeletePage;
