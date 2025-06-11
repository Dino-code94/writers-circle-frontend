import React, { useEffect, useState } from 'react';
import API from '../services/api';  // your axios instance
import { useNavigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);  // while checking user
  const navigate = useNavigate();

  useEffect(() => {
    // Call backend to check if user is superuser
    API.get('user/')
      .then(res => {
        if (!res.data.is_superuser) {
          // If not superuser, redirect to home
          navigate('/');
        }
        setLoading(false);  // authorized
      })
      .catch(err => {
        console.error(err);
        // Any error (e.g. not logged in) — redirect to home
        navigate('/');
      });
  }, [navigate]);

  // While loading, show simple loading state
  if (loading) return <div>Loading...</div>;

  // If authorized, render the protected children components
  return children;
}

export default AdminProtectedRoute;
