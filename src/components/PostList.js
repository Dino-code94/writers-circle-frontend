import React, { useEffect, useState } from 'react';
import API from '../services/api';

// PostList component to fetch & display posts
function PostList() {
  const [posts, setPosts] = useState([]);

  // Fetch posts on component load
  useEffect(() => {
    API.get('posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author.username}</p>
          <p>Votes: {post.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
