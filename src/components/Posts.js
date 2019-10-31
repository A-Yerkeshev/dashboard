import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
  console.log('Posts Mounted')
  const [state, setState] = useState({
    posts: []
  });

  useEffect(() => {
    // Get posts from JSONPlaceholder
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        setState({
          posts: response.data
        })
      });
  }, []);

  // Function to add new post
  const addPost = (newPost) => {
    const posts = [...state.posts, newPost];
    setState({
      posts
    })
  }

  // Function that returns a JSX template from posts data
  const displayPosts = () => {
    let result = [];

    state.posts.forEach((post) => {
      result.push(<Post key={ post.id } post={ post }/>)
    })

    return result;
  }

  return (
    <div className="container posts-container">
      { displayPosts() }
    </div>
  );
}

export default Posts;
