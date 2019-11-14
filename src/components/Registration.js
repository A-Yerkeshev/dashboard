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
  return (
    <div className="container registration">
      <h2>Welcome to Dashboard App!</h2>
      <form className="reg-form">
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
