import React, { useState } from 'react';
import axios from 'axios';

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
      console.log(response.data);
    });

  return (
    <div>
      <h2>Posts go here</h2>
    </div>
  );
}

export default Posts;
