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
        <form>
          <input placeholder="Add new post" />
          <button type="submit">Add</button>
        </form>
      )
    } else {
      return;
    }
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
