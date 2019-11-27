import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Posts from './components/Posts';
import PostPage from './components/PostPage';
import Registration from './components/Registration';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {

  const [state, setState] = useState({
    currentUser: null,
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
          ...state,
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
      ...state,
      posts: [...state.posts, ...posts]
    })
  }

  const setCurrentUser = (user) => {
    setState({
      ...state,
      currentUser: user
    })
  }

  const signOut = () => {
    setState({
      ...state,
      currentUser: null
    })
  }

  const header = () => {
    let authLinks;
    let profileInfo;

    if (state.currentUser == null) {
      authLinks = (
        <React.Fragment>
          <Link to='/sign-in'>Sign In |</Link>
          <Link to='/register'>Register</Link>
        </React.Fragment>
      )
      profileInfo = (
        <React.Fragment></React.Fragment>
      )
    } else {
      authLinks = (
        <React.Fragment>
          <Link to='/profile'>Profile |</Link>
          <Link to='/' onClick={ signOut }>Sign Out</Link>
        </React.Fragment>
      )
      profileInfo = (
        <div id="prof-head">
          <h3>Signed as <i className="fas fa-user"></i> { state.currentUser.username }</h3>
        </div>
      )
    }

    return (
      <header>
        <h2>Dashboard App</h2>
        <nav>
          <Link to='/'>Home |</Link>
          { authLinks }
        </nav>
        { profileInfo }
      </header>
    )
  }

  const footer = () => {
    return (
      <footer>
        <span>Powered by <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></span><br/>
        <span>Dummy data is provided by <a href="https://jsonplaceholder.typicode.com/"
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
          <PostPage posts={ state.posts } generateRandomData={ generateRandomData }/>
        )}/>
        <Route path='/sign-in' render={ () => (
          <Auth setCurrentUser={ setCurrentUser }/>
        )}/>
        <Route path='/register' render={ () => (
          <Registration setCurrentUser={ setCurrentUser }/>
        )}/>
        <Route path='/profile' render={ () => (
          <Profile />
        )}/>
        { footer() }
      </div>
    </Router>
  );
}

export default App;
