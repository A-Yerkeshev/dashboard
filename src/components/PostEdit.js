import React from 'react';
import { Redirect } from 'react-router-dom';

function PostEdit(props) {
  const postId = props.post.id;
  const userId = props.post.userId
  const title = props.post.title.charAt(0).toUpperCase() + props.post.title.slice(1);
  const body = props.post.body.charAt(0).toUpperCase() + props.post.body.slice(1);
  const author = props.post.author;
  const likes = props.post.likes;
  const dislikes = props.post.dislikes;
  const date = props.post.date;
  const comments = props.post.comments;
  const user = props.user;
  const post = props.post;

  // Protect route from unauthorized access
  if (!user || user.id !== userId) {
    return (
      <Redirect to={ `/post/${postId}` } />
    )
  }

  return (
    <div className="post-edit">
      <form className="post-edit-form">
        <input name="title" value={ title } />
        <textarea value={ body } />
        <button className="btn-submit btn-blue">Save</button>
        <button className="btn-dark">Cancel</button>
      </form>
      <span>{ date }</span><br/>
      <span>{ author }</span><br/>
      <i className="far fa-thumbs-up fa-2x"></i> { likes }
      <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
      <i className="far fa-comment fa-2x"></i> { comments }
    </div>
  )
}

export default PostEdit
