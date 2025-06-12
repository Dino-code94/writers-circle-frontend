import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import Comments from './Comments';
import VoteUpDown from './VoteUpDown';

// PostDetail component: displays full post with details, votes and comments
function PostDetail() {
  const { id } = useParams();  // extract post ID from URL params
  const [post, setPost] = useState(null);  // state to hold post data

  // Fetch the post from backend API (wrapped in useCallback for ESLint stability)
  const fetchPost = useCallback(() => {
    API.get(`posts/${id}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Fetch post data when component mounts or ID changes
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // Show loading while fetching
  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
          <p className="text-muted">Author: {post.author.username}</p>

          {/* Voting section */}
          <VoteUpDown postId={post.id} currentVotes={post.votes} refreshPosts={fetchPost} />

          {/* Comments section */}
          <Comments postId={post.id} />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
