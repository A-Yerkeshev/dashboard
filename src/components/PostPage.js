import React from 'react';
import { useParams } from 'react-router-dom';

import Post from './Post';

function PostPage(props) {
  const postId = useParams().postId;
  const posts = props.posts;

  const displayPost = () => {
    if (posts[postId]) {
      return <Post post={ posts[postId] }/>
    } else {
      return (
        <div className="no-post">
          <h3>Sorry, we could not find this post</h3>
          <b>Try to reload the page and check your internet connection</b>
        </div>
      )
    }
  }

  return (
    <div className="post-page">
      { displayPost() }
    </div>
  );
}

export default PostPage;
