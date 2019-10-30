import React, { useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {

  const [state, setState] = useState({
    posts: []
  });

  const addPost = (newPost) => {
    const posts = [...state.posts, newPost];
    setState({
      posts
    })
  }

  axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => {
      setState({
        posts: response.data
      })
    });

  const displayPosts = () => {
    let result = [];

    state.posts.forEach((post) => {
      result.push(<Post key={ post.id } post={ post }/>)
    })

    return result;
  }

  return (
    <div>
      { displayPosts() }
    </div>
  );
}

export default Posts;
