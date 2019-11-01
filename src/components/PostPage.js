import React, { useState, useEffect } from 'react';

import Post from './Post';

function PostPage(props) {
  const post = props.post;

  return (
    <div className="post-page">
      <Post post={ post }/>
    </div>
  );
}

export default PostPage;
