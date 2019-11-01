import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Post from './Post';

function PostPage(props) {
  const postId = useParams().postId;

  // Function that sends postId to App component
  const sendPostId = () => {
    props.getPostId(postId);
  }
  sendPostId();

  return (
    <div className="post-page">
      <Post post={ post }/>
    </div>
  );
}

export default PostPage;
