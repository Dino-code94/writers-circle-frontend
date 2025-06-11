import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import VoteUpDown from './VoteUpDown';
import Comments from './Comments';

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    API.get('posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Posts</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h4>
                <p className="card-text">{post.content}</p>
                <p className="card-text">
                  <small className="text-muted">Author: {post.author.username}</small>
                </p>
                <VoteUpDown postId={post.id} currentVotes={post.votes} refreshPosts={fetchPosts} />
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
