import React, { useState } from 'react';
import API from '../services/api';

// CreatePost component: allows user to submit new post
function CreatePost() {
  // Form state: title, content, category
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send post data to backend
      await API.post('posts/', formData);
      alert('Post created successfully!');
      // Clear form after submit
      setFormData({ title: '', content: '', category: '' });
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Post</h2>

      {/* Bootstrap-styled form */}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">

        {/* Title input */}
        <div className="mb-3">
          <input
            name="title"
            className="form-control"
            placeholder="Title"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>

        {/* Content textarea */}
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            onChange={handleChange}
            value={formData.content}
            rows="5"
            required
          />
        </div>

        {/* Category input */}
        <div className="mb-3">
          <input
            name="category"
            className="form-control"
            placeholder="Category"
            onChange={handleChange}
            value={formData.category}
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-success w-100">
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
