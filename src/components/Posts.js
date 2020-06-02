import React from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import $ from 'jquery';

import Post from './Post';

function Posts(props) {
  const posts = props.posts;
  const user = props.user;
  const customPostsNum = props.customPostsNum;
  const loadNewPosts = props.loadNewPosts;
  const addPost = props.addCustomPost;

  // Load more posts when bottom of the page is reached
  useBottomScrollListener( () => {
    if (posts.length >= 10) {
      loadNewPosts();
    }
  })


  // Function that makes JSX templates from posts data
  const displayPosts = () => {
    let result = [];

    posts.forEach((post) => {
      result.push(<Post key={ post.id } user={ user } post={ post }/>);
    });

    return result
  }

  // Display piece of interface for adding new post
  const newPost = () => {
    if (user) {
      return (
        <form id="new-post-form" onSubmit={ addNewPost }>
          <input id="new-post-input" placeholder="Add new post" onFocus={ expandInputField } />
          <input id="new-post-title" placeholder="Post title" name="title" />
          <textarea id="new-post-textarea" name="text" />
          <button className="btn-blue" type="submit">Publish</button>
          <button className="btn-dark" onClick={ shrinkInputField }>
            <i className="fas fa-angle-double-up fa-2x"></i>
          </button>
        </form>
      )
    } else {
      return;
    }
  }

  const expandInputField = () => {
    $('#new-post-input').hide();
    $('#new-post-title').show();
    $('#new-post-textarea').show();
    $('#new-post-form > .btn-dark').show();
  }

  const shrinkInputField = (event = undefined) => {
    if (event) {
      event.preventDefault();
    }

    $('#new-post-title').hide();
    $('#new-post-textarea').hide();
    $('#new-post-form > .btn-dark').hide();
    $('#new-post-input').show();
  }

  const clearInputField = () => {
    $('#new-post-title').text('');
    $('#new-post-textarea').text('');
  }

  const addNewPost = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const title = data.get('title');
    const body = data.get('text');

    const post = {
      id: customPostsNum + 101,
      title,
      body,
      userId: user.id,
      author: user.username,
      likes: 0,
      dislikes: 0,
      comments: 5,
      date: new Date().toDateString()
    }

    addPost(post);
    clearInputField();
    shrinkInputField();
  }

  return (
    <div className="container posts-container">
      { newPost() }
      <span className="error-top"></span>
      { displayPosts() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <span className="error-bottom"></span>
    </div>
  );
}

export default Posts;
