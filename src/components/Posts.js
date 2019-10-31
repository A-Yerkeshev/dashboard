import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import Post from './Post';

function Posts() {
  const [state, setState] = useState({
    posts: []
  });

  useEffect(() => {
    // Get fist 10 posts from JSONPlaceholder
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=1`)
      .then((response) => {
        // Generate random data for posts
        response.data.forEach((post) => {
          generateRandomData(post);
        });
        setState({
          posts: response.data
        });
      });
  }, []);

  // Load more posts when bottom of the page is reached
  let loadDozen = 2;
  const loadMorePosts = useBottomScrollListener(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=` + loadDozen)
      .then((response) => {
        // Generate random data for posts
        response.data.forEach((post) => {
          generateRandomData(post);
        });
        const posts = [...state.posts, ...response.data];
        setState({
          posts
        });
        loadDozen++;
      });
  });

  // Function to add new post
  const addPost = (newPost) => {
    const posts = [...state.posts, newPost];
    setState({
      posts
    })
  }

  // Function that makes JSX templates from posts data
  const displayPosts = () => {
    let result = [];

    state.posts.forEach((post) => {
      result.push(<Post key={ post.id } post={ post }/>);
    });

    return result
  }

  // Function that randomly generates date, number of likes and dislikes for the post
  const generateRandomData = (post) => {
    const likes = Math.floor(Math.random() * 101);
    const dislikes = Math.floor(Math.random() * -101);
    const commentsNum = Math.floor(Math.random() * 101);

    const minDate = new Date(2010, 0, 1);
    const maxDate = new Date();
    const date = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())).toDateString();

    post.likes = likes;
    post.dislikes = dislikes;
    post.commentsNum = commentsNum;
    post.date = date;
  }

  return (
    <div className="container posts-container">
      { displayPosts() }
    </div>
  );
}

export default Posts;
