import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
    currentPost: {}
  })

  // Function that gets post id from PostPage component
  const getPostId = (postId) => {
    return postId;
  }

  return (
    <Router>
      <div className="container">
        { header() }
        <Route exact path='/' render={ () => (
          <Posts getPostById = {getPostById}/>
        )}/>
        <Route path='/post/:postId' render={ () => (
          <PostPage getPostId = {getPostId} />
        )}/>
        { footer() }
      </div>
    </Router>
  );
}

export default App;
