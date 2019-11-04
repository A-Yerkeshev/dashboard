import React, { useState, useEffect } from 'react';

import Post from './Post';

function Posts(props) {
  const posts = props.posts;

  // Function that makes JSX templates from posts data
  const displayPosts = () => {
    let result = [];

    posts.forEach((post) => {
      result.push(<Post key={ post.id } post={ post }/>);
    });

    return result
  }



/*  // Send post with matched id to App component
  const findPostById = () => {
    for (let i=0; i<(posts.length); i++) {
      if (posts[i].id === postId) {
        getPostById(posts[i]);
        return;
      }
    }
  }
  findPostById();

  const addPost = (newPost) => {
    const posts = [...state.posts, newPost];
    setState({
      posts
    })
  } */

  return (
    <div className="container posts-container">
      { displayPosts() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  );
}

export default Posts;
