import React, { useState } from 'react';

function Post(props) {
  const title = props.post.title;
  const body = props.post.body;

  return (
    <div>
      <b>{ title }</b>
      <em>{ body }</em>
    </div>
  );
}

export default Post;
