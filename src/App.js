import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import customPosts from './posts.json'

import Posts from './components/Posts';
import PostPage from './components/PostPage';
import Registration from './components/Registration';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {

  const [state, setState] = useState({
    currentUser: null,
    posts: customPosts,
    customPostsNum: customPosts.length
  })

  useEffect( () => {
    // Get fist 10 posts from JSONPlaceholder
    loadNewPosts();
  }, [])

  // Randomly generate date, number of likes dislikes and comments for the post
  const generateRandomData = (post) => {
    const likes = Math.floor(Math.random() * 101);
    const dislikes = Math.floor(Math.random() * -101);

    const minDate = new Date(2010, 0, 1);
    const maxDate = new Date();
    const date = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())).toDateString();

    post.likes = likes;
    post.dislikes = dislikes;
    post.date = date;
    post.comments = 5;
  }

  const loadNewPosts = () => {
    const userId = (state.posts.length - state.customPostsNum)/10 + 1;

    if (state.posts.length < 100) {
      $('.spinner').show();

      // First get the username of author
      axios.get(`https://jsonplaceholder.typicode.com/users/` + userId)
        .then((response) => {
          const username = response.data.username;

          // After get the posts
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + userId)
            .then((response) => {
              // Clean error line
              $('.error-bottom').text('');
              response.data.forEach((post) => {
                generateRandomData(post);
                post.author = username;
              })
              setState({
                ...state,
                posts: [...state.posts, ...response.data]
              })
            })
        })
        .catch((error) => {
          $('.error-bottom').text('Could not load more posts. Check your internet connection.');
        })
        .finally(() => {
          $('.spinner').hide();
        })
      }
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

  const addCustomPost = (post) => {
    $('.error-top').text('');
    axios.post('/posts/new-post', post)
      .then((reposne) => {
        setState({
          ...state,
          posts: [post, ...state.posts],
          customPostsNum: state.customPostsNum + 1
        })
      })
      .catch((error) => {
        $('.error-top').text('Failed to publish new post. Check your internet connection.');
        console.log(error)
      })
  }

  const profileRoute = () => {
    if (state.currentUser) {
      return (
        <Route path='/profile'>
          <Profile user={ state.currentUser }/>
        </Route>
      )
    } else {
      return (
        <Redirect to='/'/>
      )
    }
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
          <h3>Signed as <img src={ process.env.PUBLIC_URL + state.currentUser.picture } />
            { ' ' + state.currentUser.username }
          </h3>
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
        <Switch>
          <Route exact path='/'>
            <Posts posts={ state.posts } user={ state.currentUser } customPostsNum={ state.customPostsNum }
              loadNewPosts={ loadNewPosts } addCustomPost={ addCustomPost }/>
          </Route>
          <Route path='/post/:postId'>
            <PostPage posts={ state.posts } generateRandomData={ generateRandomData }/>
          </Route>
          <Route path='/sign-in'>
            <Auth setCurrentUser={ setCurrentUser }/>
          </Route>
          <Route path='/register'>
            <Registration setCurrentUser={ setCurrentUser }/>
          </Route>
          { profileRoute() }
        </Switch>
        { footer() }
      </div>
    </Router>
  )
}

export default App;
