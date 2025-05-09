import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Registered Administrators</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.AdministratorID}>
              <td>{admin.AdministratorID}</td>
              <td>{admin.FirstName} {admin.LastName}</td>
              <td>{admin.Email}</td>
              <td>{admin.PhoneNumber}</td>
              <td>{new Date(admin.RegistrationDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListPage;
