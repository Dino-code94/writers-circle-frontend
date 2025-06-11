import React, { useState, useEffect } from 'react';
import API from '../services/api';

// Comments component: list and add comments for a post
function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  // Fetch comments when component loads
  useEffect(() => {
    API.get('comments/', { params: { post: postId } })
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [postId]);

  // Handle comment submission
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
    <div>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {comments.map((comment) => (
        <div key={comment.id} style={{ margin: '10px 0' }}>
          <strong>{comment.author.username}:</strong> {comment.content}
        </div>
      ))}
    </div>
  );
}

export default Comments;
