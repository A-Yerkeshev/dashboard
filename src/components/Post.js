import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

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
  const post = props.post;
  const user = props.user;
  const deletePost = props.deletePost;

  let { path } = useRouteMatch();

  const editDeleteButtons = () => {
    if (user) {
      if (user.id === userId) {
        return (
          <React.Fragment>
            <i className="fas fa-trash fa-2x" onClick={ openConfirmDeleteBox }></i>
            <Link to={`/post/${postId}/edit`}><i className="fas fa-edit fa-2x"></i></Link>
          </React.Fragment>
        )
      } else {
        return;
      }
    } else {
      return;
    }
  }

  const deleteCurrentPost = () => {
    deletePost(postId);
  }

  const confirmDeleteBox = () => {
    if (user) {
      if (user.id === userId) {
        return (
          <div id="confirm-delete-box">
            <span className="error delete-error"></span>
            <h3>Are you sure you want to delete this post?</h3>
            <button className="btn-blue" onClick={ deleteCurrentPost }>Yes</button>
            <button className="btn-dark" onClick={ closeConfirmDeleteBox }>No</button>
          </div>
        )
      } else {
        return;
      }
    } else {
      return;
    }
  }

  const openConfirmDeleteBox = () => {
    $('#confirm-delete-box').show();
  }

  const closeConfirmDeleteBox = () => {
    $('#confirm-delete-box').hide();
  }

  return (
    <Switch>
      <Route exact path={path}>
        <div className="post">
          <Link to={ '/post/' + postId } className="post-link">
            <h3>{ title }</h3><br/>
            <p>{ body }</p><br/>
            <span>{ date }</span><br/>
            <span>{ author }</span><br/>
          </Link>
          <i className="far fa-thumbs-up fa-2x"></i> { likes }
          <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
          <i className="far fa-comment fa-2x"></i> { comments }
          { editDeleteButtons() }
          { confirmDeleteBox() }
        </div>
      </Route>
      <Route path={`${path}/edit`}>
        <PostEdit user={user} post={post}/>
      </Route>
    </Switch>
  )
}

export default Post;
