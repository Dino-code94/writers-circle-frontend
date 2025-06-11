import React from 'react';
import API from '../services/api';

// VoteUpDown component: handle voting for posts
function VoteUpDown({ postId, currentVotes, refreshPosts }) {
  // Handle voting logic
  const vote = async (action) => {
    try {
      await API.post(`vote/${postId}/`, { action });
      refreshPosts(); // Reload posts after voting
    } catch (err) {
      alert('Voting failed');
    }
  };

  return (
    <div>
      <button onClick={() => vote('upvote')}>👍</button>
      <span>{currentVotes}</span>
      <button onClick={() => vote('downvote')}>👎</button>
    </div>
  );
}

export default VoteUpDown;
