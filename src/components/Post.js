import React from 'react';

function Post(props) {
  // Get props
  const title = props.post.title.charAt(0).toUpperCase() + props.post.title.slice(1);
  const body = props.post.body.charAt(0).toUpperCase() + props.post.body.slice(1);

  return (
    <div className="post">
      <h3>{ title }</h3><br/>
      <p>{ body }</p><br/>
      <i className="far fa-thumbs-up fa-2x"></i> 0
      <i className="far fa-thumbs-down fa-2x"></i> 0
      <i className="far fa-comment fa-2x"></i>
    </div>
  );
}

export default Post;
