import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const postId = props.post.id;
  const title = props.post.title.charAt(0).toUpperCase() + props.post.title.slice(1);
  const body = props.post.body.charAt(0).toUpperCase() + props.post.body.slice(1);
  const likes = props.post.likes;
  const dislikes = props.post.dislikes;
  const date = props.post.date;

  return (
    <Link to={ '/post/' + postId } className="post-link">
      <div className="post">
        <h3>{ title }</h3><br/>
        <p>{ body }</p><br/>
        <span>{ date }</span><br/>
        <i className="far fa-thumbs-up fa-2x"></i> { likes }
        <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
        <i className="far fa-comment fa-2x"></i> 5
      </div>
    </Link>
  )
}

export default Post;
