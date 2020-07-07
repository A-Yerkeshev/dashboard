import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import Posts from './components/Posts';
import PostPage from './components/PostPage';
import Registration from './components/Registration';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {
  const [state, setState] = useState({
    currentUser: null,
    posts: [],
    customPostsNum: 0
  })

  useEffect( () => {
    // Get fist 10 posts
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

  const getCustomPosts = () => {
    axios.get('/api/posts')
      .then((response) => {
        setState({
          ...state,
          posts: [...state.posts, ...response.data],
          customPostsNum: response.data.length
        })
      })
      .catch((error) => {
        console.log('Failed to load posts from DB');
      })
  }

  const loadNewPosts = () => {
    // First try to load posts from database
    axios.get('/api/posts')
      .then((response) => {
        // Clear error line
        $('.error-bottom').text('');

        const posts = response.data;

        // If 10 or more posts left unloaded from DB add 10 posts to the state
        if ((posts.length - state.customPostsNum) >= 10) {
          setState({
            ...state,
            posts: [...state.posts, ...posts.slice(state.customPostsNum - 1, 11)],
            customPostsNum: state.customPostsNum + 10
          })
        // If less then 10 posts left add them all and require remaining from JSONPlaceholder
        } else if ((posts.length - state.customPostsNum) < 10 && (posts.length - state.customPostsNum) > 0) {
          const dbPosts = posts.slice(state.customPostsNum);

          loadFromJSONPlaceholder(dbPosts);
        // If no posts left in database just get all from JSONPlaceholder
        } else if (posts.length === state.customPostsNum) {
          loadFromJSONPlaceholder();
        }
      })
      .catch((error) => {
        $('.error-bottom').text('Could not load more posts. Check your internet connection.');
      })
  }

  const loadFromJSONPlaceholder = (dbPosts) => {
    const userId = (state.posts.length - state.customPostsNum)/10 + 1;

    // First get the username of author
    if (userId < 11) {
      $('.spinner').show();

      axios.get(`https://jsonplaceholder.typicode.com/users/` + userId)
        .then((response) => {
          const username = response.data.username;

          // After that get the posts
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + userId)
            .then((response) => {
              // Check how many posts of this author are already loaded
              const authorsPosts = (state.posts.length - state.customPostsNum) % 10;
              // Add remaining ones
              const posts = response.data.slice(authorsPosts);

              posts.forEach((post) => {
                generateRandomData(post);
                post.author = username;
              })

              // If some posts from database left uloaded add them as well
              if (dbPosts) {
                setState({
                  ...state,
                  posts: [...state.posts, ...dbPosts, ...posts],
                  customPostsNum: dbPosts.length
                })
              } else {
                setState({
                  ...state,
                  posts: [...state.posts, ...posts]
                })
              }
            })
            .catch((error) => {
              console.log('Could not load posts from JSONPlaceholder');
            })
            .finally(() => {
              $('.spinner').hide();
            })
        })
      }
  }

  const setCurrentUser = (user) => {
    setState({
      ...state,
      currentUser: user
    })
    getUserProfilePicture(user, $('#prof-head img'));

    // Store user cookie in browser
    // const date = new Date();
    // date.setTime(date.getTime() + (60*60*1000));

    // document.cookie = `loggedUserId=${user.id}; expires=${date.toUTCString()}`;
  }

  const signOut = () => {
    setState({
      ...state,
      currentUser: null
    })
  }

  const addCustomPost = (post) => {
    $('.error-top').text('');
    axios.post('/api/posts', post)
      .then((reposne) => {
        setState({
          ...state,
          posts: [post, ...state.posts],
          customPostsNum: state.customPostsNum + 1
        })
      })
      .catch((error) => {
        $('.error-top').text('Failed to publish new post. Check your internet connection.');
        console.log(error);
      })
  }

  const deletePost = (postId) => {
    const data = {id: postId};

    $('.delete-error').text('');
    // Send request to backend
    axios.delete('/api/posts/' + postId)
      .then((response) => {
        const index = state.posts.findIndex((post) => {
          return post.id === postId;
        })

        state.posts.splice(index, 1);

        setState({
          ...state,
          customPostsNum: state.customPostsNum - 1
        })
      })
      .catch((error) => {
        $('.delete-error').text('Could not delete a post. Please, try again.');
        console.log(error);
      })
  }

  // Refresh post state after change
  const setPostState = (postId, data) => {
    const index = state.posts.findIndex((post) => {
      return post.id === postId;
    })

    let posts = [...state.posts];
    posts[index] = data;

    setState({
      ...state,
      posts
    })
  }

  const getUserProfilePicture = async (user, imgElement) => {
    let picture;

    // Check wheter user's picture exists on server
    await axios.get(`/${user.picture}`)
      .then((response) => {
        picture = user.picture;
      })
      // If image is not found on server get it from localStorage
      .catch((error) => {
        picture = "data:image/png;base64," + localStorage.getItem(`profileImage-${user.username}`);
      })

    // Set retrieved picture as src attribute
    imgElement.attr('src', process.env.PUBLIC_URL + picture);
  }

  // const authUserFromCookies = () => {
  //   // Check if there is a user auth cookie
  //   const cookie = document.cookie;
  //   const userCookieIndex = cookie.search(`loggedUserId=`);

  //   let userId;

  //   if (userCookieIndex !== -1) {
  //     const firstIndex = userCookieIndex + 'loggedUserId='.length;
  //     const lastIndex = cookie.substring(firstIndex).indexOf(';');

  //     // If there is another cookie after user cookie, get only user cookie value
  //     if (lastIndex === -1) {
  //       userId = cookie.substring(firstIndex);
  //     } else {
  //       userId = cookie.substring(firstIndex, lastIndex);
  //     }

  //     console.log('Current state:', state)
  //     // Find user by id and sign him in
  //     axios.get(`/api/users/${userId}`)
  //       .then((response) => {
  //         setCurrentUser(response.data);
  //       })
  //   }
  // }

  const profileRoute = () => {
    if (state.currentUser) {
      return (
        <Route path='/profile'>
          <Profile user={ state.currentUser } setCurrentUser={ setCurrentUser } getProfilePicture = {getUserProfilePicture}/>
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
          <h3>Signed as <img src="/pic-placeholder-dark.png" />
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
              loadNewPosts={ loadNewPosts } addCustomPost={ addCustomPost } deletePost={ deletePost }/>
          </Route>
          <Route path='/post/:postId'>
            <PostPage posts={ state.posts } user={ state.currentUser } generateRandomData={ generateRandomData }
              deletePost={ deletePost } setPostState={ setPostState }/>
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
