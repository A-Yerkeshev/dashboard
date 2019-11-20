import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function Auth(props) {
  const setCurrentUser = props.setCurrentUser;

  const clearAlerts = () => {
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

  return (
    <div className="container log-page">
      <h2>Sign In to your account</h2>
      <span id="sign-error error"></span>
      <form className="log-form" onClick={ clearAlerts }>
        Username:<br/>
        <input type="text" name="username" id="username"/><br/>
        Password:<br/>
        <input type="password" name="password" id="password"/>{ toggleEyeButton('password') }<br/>
        <button className="btn-submit" type="submit" value="Submit">Sign In</button>
      </form>
      <h3>Don't have account yet? <Link to='/register'>Register</Link></h3>
    </div>
  )
}

export default Auth
