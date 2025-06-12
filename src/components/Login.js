import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

// Login component: handles user login & token storage
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');  // Redirect to homepage after login
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Welcome back to Writer's Circle</h2>
      <p>Login to explore and contribute to community discussions, stories and knowledge sharing.</p>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
