import React, { useState } from 'react';
import API from '../services/api';

// Login component: handles user authentication
function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' }); // form state

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await API.post('login/', formData);
      // Store the received token in localStorage
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully!');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {/* Bootstrap-styled form */}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">

        {/* Username input */}
        <div className="mb-3">
          <input
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
