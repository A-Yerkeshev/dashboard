import React, { useState } from 'react';

function Post(props) {
  // Capitalize title and body of post
  const title = props.post.title.charAt(0).toUpperCase() + props.post.title.slice(1)
  const body = props.post.body.charAt(0).toUpperCase() + props.post.body.slice(1)

  return (
    <div className="post">
      <h3>{ title }</h3><br/>
      <p>{ body }</p><br/>

    </div>
  );
}

export default Post;
