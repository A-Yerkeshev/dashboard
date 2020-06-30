import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import $ from 'jquery';
import axios from 'axios';

function PostEdit(props) {
  const postId = props.post.id;
  const userId = props.post.userId
  const title = props.post.title.charAt(0).toUpperCase() + props.post.title.slice(1);
  const body = props.post.body.charAt(0).toUpperCase() + props.post.body.slice(1);
  const author = props.post.author;
  const likes = props.post.likes;
  const dislikes = props.post.dislikes;
  const date = props.post.date;
  const comments = props.post.comments;
  const user = props.user;

  const history = createBrowserHistory();

  // Initialize state
  const [state, setState] = useState({
    title: '',
    body: ''
  })

  useEffect( () => {
    setState({
      title,
      body
    })
  }, [])

  // Protect route from unauthorized access
  if (!user || user.id !== userId) {
    return (
      <Redirect to={ `/post/${postId}` } />
    )
  }

  const saveChanges = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const title = data.get('title').trim();
    const body = data.get('body').trim();

    // Validate user input
    if (title === '') {
      $('#edit-error').text('Title cannot be blank!');
      return;
    }

    if (body === '') {
      $('#edit-error').text('Post body cannot be blank!');
      return;
    }

    const newData = {
      ...props.post,
      title,
      body
    }

    axios.put('/api/posts/' + postId, newData)
      .then((response) => {
        history.push(`/post/${postId}`);
      })
      .catch((error) => {
        $('#edit-error').text('Failed to make changes. Check your internet connection.');
        console.log(error)
      })
  }

  const trackTitleChange = (event) => {
    setState({
      ...state,
      title: event.target.value
    });
  }

  const trackPostBodyChange = (event) => {
    setState({
      ...state,
      body: event.target.value
    });
  }

  const clearAlerts = () => {
    $('#edit-error').text('');
  }

  return (
    <div className="post-edit">
      <span id="edit-error" className="error"></span>
      <form className="post-edit-form" onSubmit={ saveChanges } onClick={ clearAlerts }>
        <input name="title" id="title" value={ state.title } onChange={ trackTitleChange }/>
        <textarea name="body" id="body" value={ state.body }  onChange={ trackPostBodyChange }/>
        <button className="btn-submit btn-blue" type="submit" value="Submit">Save</button>
        <button className="btn-dark"><Link to={ `/post/${postId}` }>Cancel</Link></button>
      </form>
      <span>{ date }</span><br/>
      <span>{ author }</span><br/>
      <i className="far fa-thumbs-up fa-2x"></i> { likes }
      <i className="far fa-thumbs-down fa-2x"></i> { dislikes }
      <i className="far fa-comment fa-2x"></i> { comments }
    </div>
  )
}

export default withRouter(PostEdit)
