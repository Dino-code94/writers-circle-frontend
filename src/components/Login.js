import React, { useState } from 'react';
import API from '../services/api';

// Login component for user authentication
function Login() {
  // Form state: username & password
  const [formData, setFormData] = useState({ username: '', password: '' });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend API to log in
      const res = await API.post('login/', formData);
      // Save received token to localStorage
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully!');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
