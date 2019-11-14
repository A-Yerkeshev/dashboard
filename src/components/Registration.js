import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function Registration(props) {

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
    const username = data.get('username');
    const password = data.get('password');
    const repPassword = data.get('rep-password');

    // Validate user input
    if (password !== repPassword) {
      $('#reg-error').text('Passwords do not match!');
      $('#password').css('color', 'red');
      $('#rep-password').css('color', 'red');
      return;
    }
  }

  const clearAlerts = () => {
    $('#reg-error').text('');
    $('#username').css('color', 'black');
    $('#password').css('color', 'black');
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
