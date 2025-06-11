import React, { useEffect, useState } from 'react';
import API from '../services/api';
import VoteUpDown from './VoteUpDown';
import Comments from './Comments';

// PostList component: display all posts with voting & comments
function PostList() {
  const [posts, setPosts] = useState([]);

  // Fetch posts
  const fetchPosts = () => {
    API.get('posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author.username}</p>
          <VoteUpDown postId={post.id} currentVotes={post.votes} refreshPosts={fetchPosts} />
          <Comments postId={post.id} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
