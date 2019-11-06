import React from 'react';
import { useParams } from 'react-router-dom';

import Post from './Post';

function PostPage(props) {
  const postId = parseInt(useParams().postId, 10);
  const posts = props.posts;
  const loadSinglePost = props.loadSinglePost;

  const displayPost = () => {
    // Check if post is already loaded
    let post;
    for (let i=0; i<(posts.length); i++) {
      if (posts[i].id === postId) {
        post = posts[i];
        break;
      }
    }
    if (post !== undefined) {
      return <Post post={ post }/>
    } else {
      // If post is not loaded yet, try to get it from server
      loadSinglePost(postId);
    }
  }

  return (
    <div className="post-page">
      { displayPost() }
      <div className="no-post">
        <h3>Sorry, we could not find this post</h3>
        <b>Try to reload the page and check your internet connection</b>
      </div>
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  );
}

export default PostPage;
