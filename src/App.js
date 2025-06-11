import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import core components
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';

// Import Admin components
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';  // Protection wrapper

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PostList />} />               {/* Home - List posts */}
        <Route path="/register" element={<Register />} />        {/* User Registration */}
        <Route path="/login" element={<Login />} />              {/* User Login */}
        <Route path="/create" element={<CreatePost />} />        {/* Create new post */}
        <Route path="/post/:id" element={<PostDetail />} />      {/* View post details */}

        {/* Admin Route - now protected */}
        <Route path="/admin-dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
