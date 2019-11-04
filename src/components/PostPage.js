import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Post from './Post';

function PostPage(props) {
  const postId = useParams().postId;
  const getCurrentPostId = props.getCurrentPostId;

  // Function that sends postId to App component
  const sendPostId = () => {
    getCurrentPostId(postId);
  }
  sendPostId();

  return (
    <div className="post-page">
      <Post/>
    </div>
  );
}

export default PostPage;
