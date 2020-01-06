import React from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Profile(props) {
  const user = props.user;

  const picturePanel = () => {
    return (
      <div id="pic-panel">
        <form className="container" onSubmit={ changePicture }>
          <input id="pic-panel-input" onChange={ previewPicture } type="file" name="pic" accept="image/*"/>
          <input id="pic-panel-submit" className="btn-dark" type="submit" value="Change picture" />
          <img id="preview"/>
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

  const previewPicture = (event) => {
    const src = URL.createObjectURL(event.target.files[0]);

    $('#preview').attr('src', src);
  }

  const changePicture = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // Add current user id to form data
    data.append('userId', user.id);

     axios.post('/profile/change-pic', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
      .then( (response) => {
        closePicturePanel();
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  return (
    <div className="container profile">
      <div className="prof-pic">
        <img src={ process.env.PUBLIC_URL + user.picture } />
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

export default withRouter(Profile)
