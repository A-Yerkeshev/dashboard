import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';

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

  let { path, url } = useRouteMatch();

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
    <div className="post">
      <Link to={ '/post/' + postId } className="post-link">
        <h3>{ title }</h3><br/>
        <p>{ body }</p><br/>
      </Link>
      <span>{ date }</span><br/>
      <span>{ author }</span><br/>
      <i className="far fa-thumbs-up fa-2x"></i> { likes }
      <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
      <i className="far fa-comment fa-2x"></i> { comments }
      { editDeleteButtons() }
    </div>
  )
}

export default Post;
