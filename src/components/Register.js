import React, { useState } from 'react';
import API from '../services/api';

// Register component: handles user registration
function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' }); // form state

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request to backend
      await API.post('register/', formData);
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

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
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
