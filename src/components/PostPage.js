import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import Post from './Post';

function PostPage(props) {
  const postId = parseInt(useParams().postId, 10);
  const posts = props.posts;
  const user = props.user;
  const generateRandomData = props.generateRandomData;
  const deletePost = props.deletePost;

  const [state, setState] = useState({
    post: null,
    comments: []
  })

  const loadComments = (post) => {
    $('.spinner').show();

    axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=` + postId)
      .then((response) => {
        $('.error-bottom').text('');
        setState({
          post,
          comments: response.data
        })
      })
      .catch((error) => {
        $('.error-bottom').text('Could not load comments. Check your internet connection.');
      })
      .finally(() => {
        $('.spinner').hide();
      })
  }

  useEffect( () => {
    // Load current post by id provided
    // Check if post is already loaded
    for (let i=0; i<(posts.length); i++) {
      if (posts[i].id === postId) {
        setState({
          post: posts[i],
          comments: state.comments
        })
        loadComments(posts[i]);
        return;
      }
    }

    // Otherwise request it from server
    if (!state.post) {
      if (postId <= 100) {
        $('.spinner').show();

        const authorId = Math.ceil(postId * 0.1)
        axios.get(`https://jsonplaceholder.typicode.com/users/` + authorId)
          .then((response) => {
            const author = response.data.name;

            axios.get(`https://jsonplaceholder.typicode.com/posts/` + postId)
              .then((response) => {
                const post = response.data;

                post.author = author;
                generateRandomData(post);
                setState({
                  post,
                  comments: state.comments
                })
                loadComments(post);
              })
          })
          .catch( (error) => {
            console.log('Cannot load post. Error: ' + error)
          })
        }
      }
  }, [postId, posts])

  const setPostState = (post) => {
    setState({
      ...state,
      post: post
    })
  }

  const displayPost = () => {
    if (state.post) {
      return (
        <div className="single-post">
          <Post post={ state.post } user={user} deletePost={ deletePost } setPostState={ setPostState }/>
        </div>
      )
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
        <div key={ comment.id } className="comment">
          <span>{ comment.email }</span>
          <h3>{ comment.name }</h3>
          <p>{ comment.body }</p>
        </div>
      )
    })
    return (
      <div className="comments container">
        <div className="fa-3x spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        { result }
      </div>
    )
  }

  return (
    <div className="post-page container">
      { displayPost() }
      { displayComments() }
      <span className="error-bottom"></span>
    </div>
  );
}

export default PostPage;
