import React from 'react';

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

  return (
    <div className="container posts-container">
      { displayPosts() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <span className="error-bottom"></span>
    </div>
  );
}

export default Posts;
