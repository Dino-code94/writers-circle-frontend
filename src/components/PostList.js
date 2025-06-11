import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import VoteUpDown from './VoteUpDown';
import Comments from './Comments';

// PostList component: fetch and display all posts
function PostList() {
  const [posts, setPosts] = useState([]); // post list state

  // Fetch posts from backend
  const fetchPosts = () => {
    API.get('posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Posts</h2>

      {/* Bootstrap grid layout */}
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Post title with link to PostDetail */}
                <h4 className="card-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h4>

                {/* Post content */}
                <p className="card-text">{post.content}</p>

                {/* Author info */}
                <p className="card-text">
                  <small className="text-muted">Author: {post.author.username}</small>
                </p>

                {/* Voting component */}
                <VoteUpDown postId={post.id} currentVotes={post.votes} refreshPosts={fetchPosts} />

                {/* Comments component */}
                <Comments postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
