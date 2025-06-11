import React, { useState, useEffect } from 'react';
import API from '../services/api';

// Comments component: list and submit comments for post
function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  // Load comments from backend
  useEffect(() => {
    API.get('comments/', { params: { post: postId } })
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [postId]);

  // Handle comment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('comments/', { post: postId, content });
      setContent('');
      const res = await API.get('comments/', { params: { post: postId } });
      setComments(res.data);
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  return (
    <div className="mt-3">
      <h4>Comments</h4>

      {/* Comment submission form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <textarea
          className="form-control mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Render all comments */}
      {comments.map((comment) => (
        <div key={comment.id} className="mb-2 p-2 border rounded">
          <strong>{comment.author.username}:</strong> {comment.content}
        </div>
      ))}
    </div>
  );
}

export default Comments;
