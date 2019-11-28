import React from 'react';

function Profile(props) {
  const user = {
    id: 3,
    username: 'SomeTestUser',
    headline: 'The aim of my existance is the testing of Profile component',
    password: 'waaaa'
  }

  return (
    <div className="container profile">
      <div className="prof-pic">
        <i className="fas fa-user"></i>
        <button>Change picture</button>
      </div>
      <div className="prof-info">
        <h2>{ user.username }</h2>
        <h3>{ user.headline }</h3>
        <h4>Recent posts:</h4>
        <h4>Recent comments:</h4>
      </div>
    </div>
  )
}

export default Profile
