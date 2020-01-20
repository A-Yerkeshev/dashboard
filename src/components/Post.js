import React from 'react';
import { Link } from 'react-router-dom';

import PostEdit from './PostEdit';

function Post(props) {
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

  const editDeleteButtons = () => {
    if (user) {
      if (user.id === userId) {
        return (
          <React.Fragment>
            <i className="fas fa-trash fa-2x"></i>
            <i className="fas fa-edit fa-2x"></i>
          </React.Fragment>
        )
      } else {
        return;
      }
    } else {
      return;
    }
  }

  return (
    <Link to={ '/post/' + postId } className="post-link">
      <div className="post">
        <h3>{ title }</h3><br/>
        <p>{ body }</p><br/>
        <span>{ date }</span><br/>
        <span>{ author }</span><br/>
        <i className="far fa-thumbs-up fa-2x"></i> { likes }
        <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
        <i className="far fa-comment fa-2x"></i> { comments }
        { editDeleteButtons() }
      </div>
    </Link>
  )
}

export default Post;
