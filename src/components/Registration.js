import React from 'react';
import $ from 'jquery';

function Registration(props) {

  const toggleEyeButton = () => {
    const toggle = (event) => {
      event.preventDefault();
      $(event.target).toggle();
      $(event.target).siblings().toggle();
    }

    return (
      <button onClick={ toggle }>
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
        <input type="text" name="username"/><br/>
        Password:<br/>
        <input type="password" name="password"/>{ toggleEyeButton() }<br/>
        Repeat password:<br/>
        <input type="password" name="rep-password"/>{ toggleEyeButton() }<br/>
      </form>
    </div>
  )
}

export default Registration
