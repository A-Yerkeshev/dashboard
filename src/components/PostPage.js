import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Post from './Post';

function PostPage(props) {
  const postId = parseInt(useParams().postId, 10);
  const posts = props.posts;
  const loadSinglePost = props.loadSinglePost;
  const [state, setState] = useState({
    post: undefined,
    comments: []
  })

  // Set current post
  useEffect( () => {
    // Check if post is already loaded
    for (let i=0; i<(posts.length); i++) {
      if (posts[i].id === postId) {
        setState({
          post: posts[i],
          comments: state.comments
        })
        break;
      }
    }
    // If post is not loaded yet, try to get it from server
    if (state.post === undefined) {
      loadSinglePost(postId);
    }
  }, [postId, posts, loadSinglePost])

  const displayPost = () => {
    if (state.post) {
      return <Post post={ state.post }/>;
    } else {
      return (
        <div className="no-post">
          <h3>Sorry, we could not find this post</h3>
          <b>Try to reload the page and check your internet connection</b>
        </div>
      )
    }
  }

  const displayComments = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/` + postId + '/comments')
      .then( (response) => {
        setState({
          post: state.post,
          comments: response.data
        })
      })
  }

  return (
    <div className="post-page">
      { displayPost() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  );
}

export default PostPage;
