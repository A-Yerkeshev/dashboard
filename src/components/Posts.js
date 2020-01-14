import React from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import axios from 'axios';
import $ from 'jquery';

import Post from './Post';

function Posts(props) {
  const posts = props.posts;
  const user = props.user;
  const addNewPosts = props.addNewPosts;

  // Load more posts when bottom of the page is reached
  useBottomScrollListener( () => {
    if (posts.length < 100) {
      $('.spinner').show();
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + (posts.length/10 + 1))
        .then((response) => {
          // Clean error line
          $('.error-bottom').text('');
          addNewPosts(response.data);
        })
        .catch( (error) => {
          $('.error-bottom').text('Could not load more posts. Check your internet connection.');
        })
        .finally( () => {
          $('.spinner').hide();
        });
      }
  });

  // Function that makes JSX templates from posts data
  const displayPosts = () => {
    let result = [];

    posts.forEach((post) => {
      result.push(<Post key={ post.id } post={ post }/>);
    });

    return result
  }

  // Display piece of interface for adding new post
  const newPost = () => {
    if (user) {
      return (
        <form id="new-post-form">
          <input id="new-post-input" placeholder="Add new post" onFocus={ expandInputField } />
          <textarea id="new-post-textarea" />
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
    $('#new-post-textarea').show();
    $('#new-post-form > .btn-dark').show();
  }

  const shrinkInputField = (event) => {
    event.preventDefault();

    $('#new-post-textarea').hide();
    $('#new-post-form > .btn-dark').hide();
    $('#new-post-input').show();
  }

  return (
    <div className="container posts-container">
      { newPost() }
      { displayPosts() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <span className="error-bottom"></span>
    </div>
  );
}

export default Posts;
