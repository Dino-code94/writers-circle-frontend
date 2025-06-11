import React, { useState } from 'react';
import API from '../services/api';

// CreatePost component for submitting new posts
function CreatePost() {
  // Form state: title, content, category
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('posts/', formData);
      alert('Post created successfully!');
      setFormData({ title: '', content: '', category: '' });
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <textarea name="content" placeholder="Content" onChange={handleChange} value={formData.content} required />
        <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
