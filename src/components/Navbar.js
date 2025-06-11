import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component with Bootstrap styling
function Navbar() {
  // Handle logout logic: clear token & reload page
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand name */}
        <Link className="navbar-brand" to="/">Writer's Circle</Link>

        {/* Navigation links */}
        <div>
          <Link className="btn btn-outline-light me-2" to="/create">Create Post</Link>
          <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <button className="btn btn-outline-warning" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
