import React from 'react';
import $ from 'jquery';
import axios from 'axios';

function Profile(props) {
  const user = {
    id: 3,
    username: 'SomeTestUser',
    headline: 'The aim of my existance is the testing of Profile component',
    password: 'waaaa'
  }

  const picturePanel = () => {
    return (
      <div id="pic-panel">
        <form className="container" onSubmit={ changePicture }>
          <input id="pic-panel-input" type="file" name="pic" accept="image/*"/>
          <input id="pic-panel-submit" className="btn-dark" type="submit" value="Change picture" />
        </form>
        <button className="btn-dark" onClick={ closePicturePanel } >Cancel</button>
      </div>
    )
  }

  const openPicturePanel = () => {
    $('#pic-panel').show();
  }

  const closePicturePanel = () => {
    $('#pic-panel').hide();
  }

  const changePicture = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

     axios.post('/profile/change-pic', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
      .then( (response) => {
        props.history.push('/');
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  return (
    <div className="container profile">
      <div className="prof-pic">
        <i className="fas fa-user"></i>
        <button className="btn-dark" onClick={ openPicturePanel }>Change picture</button>
      </div>
      <div className="prof-info">
        <h2>{ user.username }</h2>
        <h3>{ user.headline }</h3>
        <h4>Recent posts:</h4>
        <h4>Recent comments:</h4>
      </div>
      { picturePanel() }
    </div>
  )
}

export default Profile
