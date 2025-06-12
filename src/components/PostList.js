import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

// Displays list of posts on homepage
function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('posts/')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to Writer's Circle</h1>
      <p className="mb-5 fs-5">
        A global publishing platform where you can share articles, tutorials, 
        creative writing, and journalistic stories. 
        Register or login to contribute and engage with the community!
      </p>

      {posts.map(post => (
        <div key={post.id} className="card shadow-sm mb-3">
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">{post.content.substring(0, 150)}...</p>
            <p className="text-muted">Author: {post.author.username}</p>
            <Link to={`/post/${post.id}`} className="btn btn-primary">Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
