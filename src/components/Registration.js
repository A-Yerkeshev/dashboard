import React from 'react';

function Registration(props) {
  return (
    <div className="container registration">
      <h2>Welcome to Dashboard App!</h2>
      <form className="reg-form">
        Username:<br/>
        <input type="text" name="username"/><br/>
        Password:<br/>
        <input type="password" name="password"/><br/>
        Repeat password:<br/>
        <input type="password" name="rep-password"/><br/>
      </form>
    </div>
  )
}

export default Registration
