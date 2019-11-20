import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Users from '../users';

function Registration(props) {
  const setCurrentUser = props.setCurrentUser;

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

  const registerNewUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username').trim();
    const password = data.get('password');
    const repPassword = data.get('rep-password');

    // Validate user input
    if (username === '') {
      $('#reg-error').text('Username cannot be blank!');
      $('#username').css('background-color', 'red');
      return;
    }

    if (password === '') {
      $('#reg-error').text('Password cannot be blank!');
      $('#password').css('background-color', 'red');
      return;
    }

    if (password.indexOf(' ') >= 0){
      $('#reg-error').text('Password cannot contain whitespaces!');
      $('#password').css('color', 'red');
      return;
    }

    if (password.length < 5) {
      $('#reg-error').text('Password cannot be shorter that 5 characters long!');
      $('#password').css('color', 'red');
      return;
    }

    if (password !== repPassword) {
      $('#reg-error').text('Passwords do not match!');
      $('#password').css('color', 'red');
      $('#rep-password').css('color', 'red');
      return;
    }

    // Check if username is already used
    for (let i=0; i<(Users.length); i++) {
      if (Users[i].username === username) {
        $('#reg-error').text('This username is already in use!');
        $('#username').css('color', 'red');
        return;
      }
    }

    const newUser = {
      id: Users.length + 1,
      username,
      password
    }

    // Send post request to the server
    axios.post('/register', newUser)
      .then( (response) => {
        console.log('Sign in user now');
      })
      .catch( (error) => {
        console.log(error);
      });

  }

  const clearAlerts = () => {
    $('#reg-error').text('');
    $('#username').css('color', 'black');
    $('#username').css('background-color', 'white');
    $('#password').css('color', 'black');
    $('#password').css('background-color', 'white');
    $('#rep-password').css('color', 'black');
  }

  return (
    <div className="container registration">
      <h2>Welcome to Dashboard App!</h2>
      <span id="reg-error"></span>
      <form className="reg-form" onSubmit={ registerNewUser } onClick={ clearAlerts }>
        Username:<br/>
        <input type="text" name="username" id="username"/><br/>
        Password:<br/>
        <input type="password" name="password" id="password"/>{ toggleEyeButton('password') }<br/>
        Repeat password:<br/>
        <input type="password" name="rep-password" id="rep-password"/>{ toggleEyeButton('rep-password') }<br/>
        <button className="btn-submit" type="submit" value="Submit">Register</button>
      </form>
      <h3>Already have account? <Link to='/sign-in'>Sign in</Link></h3>
    </div>
  )
}

export default Registration
