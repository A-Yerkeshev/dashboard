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
    // Load comments
    axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=` + postId)
      .then( (response) => {
        setState({
          post: state.post,
          comments: response.data
        })
      })
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
    const result = state.comments.map( (comment) => {
      return (
        <div key={comment.id} className="comment">{ comment.body }</div>
      )
    console.log(result)
    })
    return (
      <div className="container">{ result }</div>
    )
  }

  return (
    <div className="post-page container">
      { displayPost() }
      { displayComments() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  );
}

export default PostPage;
