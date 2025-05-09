import React, { useState } from 'react';
import axios from 'axios';

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
    setFormData({...formData, [e.target.name]: e.target.value});
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
    <form onSubmit={handleSubmit}>
      <h2>Register Administrator</h2>
      <input name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleChange} required />
      <input name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleChange} required />
      <input name="Email" type="email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
      <input name="Password" type="password" placeholder="Password" value={formData.Password} onChange={handleChange} required />
      <input name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} required />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default AdminRegisterForm;
