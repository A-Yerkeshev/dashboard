import React from 'react';
import { Redirect } from 'react-router-dom';

function PostEdit(props) {
  const user = props.user;
  const post = props.post;

  // Protect route from access by wrong user
  if (!user || user.id !== post.userId) {
    return (
      <Redirect to={ `/post/${post.id}` } />
    )
  }

  return (
    <h1>Edit post</h1>
  )
}

export default PostEdit
