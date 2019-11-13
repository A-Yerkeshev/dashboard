import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Posts from './components/Posts';
import PostPage from './components/PostPage';

function App() {
  const [state, setState] = useState({
    posts: []
  })

  useEffect( () => {
    // Get fist 10 posts from JSONPlaceholder
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=1`)
      .then( (response) => {
        // Generate random data for posts
        response.data.forEach((post) => {
          generateRandomData(post);
        })
        setState({
          posts: [...state.posts, ...response.data]
        })
      })
  }, [])

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

  const addNewPosts = (posts) => {
    posts.forEach( (post) => {
      generateRandomData(post)
    })
    setState({
      posts: [...state.posts, ...posts]
    })
  }

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

  return (
    <Router>
      <div className="container">
        { header() }
        <Route exact path='/' render={ () => (
          <Posts posts={ state.posts } addNewPosts={ addNewPosts }/>
        )}/>
        <Route path='/post/:postId' render={ () => (
          <PostPage posts={ state.posts } generateRandomData = { generateRandomData }/>
        )}/>
        { footer() }
      </div>
    </Router>
  );
}

export default App;
