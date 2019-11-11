import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import Post from './Post';

function PostPage(props) {
  const postId = parseInt(useParams().postId, 10);
  const posts = props.posts;
  const generateRandomData = props.generateRandomData;
  const [state, setState] = useState({
    post: undefined,
    comments: []
  })

  const loadComments = (post) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=` + postId)
      .then( (response) => {
        setState({
          post,
          comments: response.data
        })
      })
  }

  // Set current post
  useEffect( () => {
    // Load current post by id provided
    // Check if post is already loaded
    for (let i=0; i<(posts.length); i++) {
      if (posts[i].id === postId) {
        setState({
          post: posts[i],
          comments: state.comments
        })
        //loadComments(posts[i]);
        break;
      }
    }

    // Otherwise request it from server
    if (state.post === undefined) {
      $('.no-post').hide();
      $('.spinner').show();
      axios.get(`https://jsonplaceholder.typicode.com/posts/` + postId)
        .then( (response) => {
          const post = response.data;
          generateRandomData(post);
          setState({
            post,
            comments: state.comments
          })
          //loadComments(post);
        })
        .catch( (error) => {
          $('.no-post').show();
        })
        .finally( () => {
          $('.spinner').hide();
        })
    }

  }, [postId, posts])

  const displayPost = () => {
    if (state.post) {
      return (
        <div className="single-post">
          <Post post={ state.post }/>
        </div>
      )
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }

  }

  const displayComments = () => {
    const result = state.comments.map( (comment) => {
      return (
        <div key={ comment.id } className="comment">
          <span>{ comment.email }</span>
          <h3>{ comment.name }</h3>
          <p>{ comment.body }</p>
        </div>
      )
    })
    return (
      <div className="comments container">{ result }</div>
    )
  }

  return (
    <div className="post-page container">
      { displayPost() }
      <div className="no-post">
        <h3>Sorry, we could not find this post</h3>
        <b>Try to reload the page and check your internet connection</b>
      </div>
      { displayComments() }
      <div className="fa-3x spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  );
}

export default PostPage;
