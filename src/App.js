import React, { useState, useEffect } from 'react';
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
      <span>Powered by <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></span><br/>
      <span>Backend is simulated by <a href="https://jsonplaceholder.typicode.com/"
        target="_blank" rel="noopener noreferrer">JSONPlaceholder</a>
      </span><br/>
    </footer>
  )
}

function App() {
  const [state, setState] = useState({
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
          posts: [...state.posts, ...response.data]
        })
      })
  }, [])

  // Load more posts when bottom of the page is reached
  useBottomScrollListener( () => {
    if (state.posts.length < 100) {
      $('.spinner').show();
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + (state.posts.length/10 + 1))
        .then((response) => {
          // Clean error line
          $('.error-bottom').text('');
          // Generate random data for posts
          response.data.forEach((post) => {
            generateRandomData(post);
          });
          setState({
            posts: [...state.posts, ...response.data]
          })
        })
        .catch( (error) => {
          $('.error-bottom').text('Could not load more posts. Check your internet connection.');
        })
        .finally( () => {
          $('.spinner').hide();
        });
      }
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

  const loadSinglePost = (postId) => {
    $('.no-post').hide();
    $('.spinner').show();
    axios.get(`https://jsonplaceholder.typicode.com/posts/` + postId)
      .then( (response) => {
        const post = response.data;
        // Avoid post dublicates
        for (let i=0; i<(state.posts.length); i++) {
          if (state.posts[i].id === postId) {
            return;
          }
        }
        generateRandomData(post);
        setState({
          posts: [...state.posts, post]
        })
      })
      .catch( (error) => {
        $('.no-post').show();
      })
      .finally( () => {
        $('.spinner').hide();
      })
  }

  return (
    <Router>
      <div className="container">
        { header() }
        <Route exact path='/' render={ () => (
          <Posts posts={ state.posts }/>
        )}/>
        <Route path='/post/:postId' render={ () => (
          <PostPage posts={ state.posts } loadSinglePost = { loadSinglePost }/>
        )}/>
        { footer() }
      </div>
    </Router>
  );
}

export default App;
