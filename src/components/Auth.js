import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Auth(props) {
  const setCurrentUser = props.setCurrentUser;

  const clearAlerts = (event) => {
    $('#sign-error').text('');
    $('#username').css('color', 'black');
    $('#username').css('background-color', 'white');
    $('#password').css('color', 'black');
    $('#password').css('background-color', 'white');
  }

  const toggleEyeButton = (fieldId) => {
    const toggle = (event) => {
      event.preventDefault();

      $(event.target).toggle();
      $(event.target).siblings().toggle();

      const field = $('#' + fieldId);

      if (field.attr('type') === 'password') {
        field.attr('type', 'text');
      } else {
        field.attr('type', 'password');
      }
    }

    return (
      <button className="eye-btn" onClick={ toggle }>
        <i className="fas fa-eye-slash"></i>
        <i className="fas fa-eye"></i>
      </button>
    )
  }

  const signIn = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get('username').trim();
    const password = data.get('password');

    // Validate user input
    if (username === '') {
      $('#sign-error').text('Username cannot be blank!');
      $('#username').css('background-color', 'red');
      return;
    }

    if (password === '') {
      $('#sign-error').text('Password cannot be blank!');
      $('#password').css('background-color', 'red');
      return;
    }

    axios.get('/api/users')
      .then((response) => {
        const users = response.data;

        for (let i=0; i<(users.length); i++) {
          if (users[i].username === username) {
            if (users[i].password === password) {
              setCurrentUser(users[i]);
              props.history.push('/');
              return;
            } else {
              $('#sign-error').text('Username or password is incorrect!');
              $('#username').css('color', 'red');
              $('#password').css('color', 'red');
              return;
            }
          }
        }

        // Alert that user with this username is not found
        $('#sign-error').text('User with this username is not found!');
        $('#username').css('color', 'red');
      })

  }

  const preventEnterKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  return (
    <div className="container log-page">
      <h2>Sign In to your account</h2>
      <span id="sign-error" className="error"></span>
      <form className="log-form" onSubmit={ signIn } onKeyDown={ preventEnterKeyDown } onClick={ clearAlerts }>
        Username:<br/>
        <input type="text" name="username" id="username" /><br/>
        Password:<br/>
        <input type="password" name="password" id="password" />{ toggleEyeButton('password') }<br/>
        <button className="btn-blue btn-submit" type="submit">Sign In</button>
      </form>
      <h3>Don't have account yet? <Link to='/register'>Register</Link></h3>
    </div>
  )
}

export default withRouter(Auth)
