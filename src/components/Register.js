import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

// Register component: handles user registration
function Register() {
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
      await API.post('register/', formData);
      alert('Registered successfully!');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register to Writer's Circle</h2>
      <p>Join our global writing community. Share stories, articles, tutorials and more.</p>

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
