import React, { useEffect, useState } from 'react';
import API from '../services/api';  // Axios instance for backend API requests

// Admin Dashboard component
function AdminDashboard() {
  const [users, setUsers] = useState([]);  // store fetched users in local state

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch user list from backend
  const fetchUsers = () => {
    API.get('admin/users/')  // GET request to backend API
      .then(res => setUsers(res.data))  // store users in state
      .catch(err => console.error(err));  // log errors if any
  };

  // Delete user by ID
  const deleteUser = (id) => {
    // Confirm deletion with browser popup
    if (window.confirm("Are you sure you want to delete this user?")) {
      API.delete(`admin/delete_user/${id}/`)  // DELETE request to backend API
        .then(() => fetchUsers())  // after successful deletion, refresh user list
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard - User Management</h2>

      {/* User Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Staff</th>
            <th>Superuser</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_staff ? "Yes" : "No"}</td>
              <td>{user.is_superuser ? "Yes" : "No"}</td>
              <td>
                {/* Delete button */}
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
