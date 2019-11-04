import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import $ from 'jquery';

import Posts from './components/Posts';
import PostPage from './components/PostPage';

const header = () => {
  return (
    <header>
      <h2>Dashboard App</h2>
    </header>
  )
}

const footer = () => {
  return (
    <footer>
      <span>Powered by <a href="https://reactjs.org/" target="_blank">React</a></span><br/>
      <span>Backend is simulated by <a href="https://jsonplaceholder.typicode.com/"
        target="_blank">JSONPlaceholder</a>
      </span><br/>
    </footer>
  )
}

function App() {
  const [state, setState] = useState({
    currentPost: {},
    posts: []
  })

  useEffect( () => {
    // Get fist 10 posts from JSONPlaceholder
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=1`)
      .then((response) => {
        // Generate random data for posts
        response.data.forEach((post) => {
          generateRandomData(post);
        })
        setState({
          ...state,
          posts: response.data
        })
      })
  }, [])

  // Load more posts when bottom of the page is reached
  const loadMorePosts = useBottomScrollListener( () => {
    if (state.posts.length < 100) {
      $('.spinner').show();
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + (state.posts.length/10 + 1))
        .then((response) => {
          // Generate random data for posts
          response.data.forEach((post) => {
            generateRandomData(post);
          });
          const posts = [...state.posts, ...response.data];
          setState({
            ...state,
            posts
          });
        });
      }
      $('.spinner').hide();
  });

  // Function that randomly generates date, number of likes and dislikes for the post
  const generateRandomData = (post) => {
    const likes = Math.floor(Math.random() * 101);
    const dislikes = Math.floor(Math.random() * -101);

    const minDate = new Date(2010, 0, 1);
    const maxDate = new Date();
    const date = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())).toDateString();

    post.likes = likes;
    post.dislikes = dislikes;
    post.date = date;
  }

  // Function that gets current post id from PostPage component
  const getCurrentPostId = (postId) => {
    console.log(postId)
    return postId;
  }

  // Function to get post from Posts component by id
  /*const getPostById = (post) => {
    console.log(post)
  } */

  return (
    <Router>
      <div className="container">
        { header() }
        <Route exact path='/' render={ () => (
          <Posts posts={ state.posts }/>
        )}/>
        <Route path='/post/:postId' render={ () => (
          <PostPage getCurrentPostId={ getCurrentPostId }/>
        )}/>
        { footer() }
      </div>
    </Router>
  );
}

export default App;
