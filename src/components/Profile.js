import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Profile(props) {
  const user = props.user;
  const setUser = props.setCurrentUser;
  const getProfilePicture = props.getProfilePicture;

  const [state, setState] = useState({
    id: 0,
    username: '',
    headline: '',
    picture: ''
  })

  useEffect( () => {
    setState({
      id: user.id,
      username: user.username,
      headline: user.headline,
      picture: ''
    })

    getProfilePicture(user, $('.prof-pic img'));
  }, [])

  const picturePanel = () => {
    return (
      <div id="pic-panel">
        <span className="error"></span>
        <form className="container" onSubmit={ changePicture }>
          <input id="pic-panel-input" onChange={ previewPicture } type="file" name="pic" accept="image/*"/>
          <input id="pic-panel-submit" className="btn-dark" type="submit" value="Change picture"/>
          <img id="preview"/>
        </form>
        <button className="btn-dark" onClick={ closePicturePanel }>Cancel</button>
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

    const image = $('#preview');

    if (!image.attr('src')) {
      $('#pic-panel > .error').text('Please, select image to upload');
      return;
    }

    const encodedImage = encodeImage(image.get(0));

    try {
      localStorage.setItem(`profileImage-${state.username}`, encodedImage);

      // Set newly saved image as active
      getProfilePicture(user, $('#prof-head img'));
      getProfilePicture(user, $('.prof-pic img'));

      closePicturePanel();
    }
    catch (error) {
      $('#pic-panel > .error').text('Failed to change image. Check your internet connection');
      console.log('Write to localStorage /profileImage-[username] failed, error: ', error);
    }

  }

  // Encode uploaded image for storing it in localStorage
  const encodeImage = (img) => {
    const imgCanvas = document.createElement("canvas");
    const imgContext = imgCanvas.getContext("2d");

    imgCanvas.width = img.width;
    imgCanvas.height = img.height;

    imgContext.drawImage(img, 0, 0, img.width, img.height);

    const imgAsDataURL = imgCanvas.toDataURL("image/png");

    return imgAsDataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  const openHeadlineInput = () => {
    $('.prof-info').css('grid-template-areas', `
      'username username'
      'headline-form headline-form'
      'recent-posts .'
      'recent-comments .'
    `);
    $('.prof-info > .headline-change').hide();
    $('.prof-info > h3').hide();
    $('.headline-form').css('display', 'grid');
  }

  const headlineInput = () => {
    return (
      <form className="headline-form" onSubmit={ changeHeadline }>
        <input value={ state.headline } name="headline" onChange={ trackHeadlineChange }/>
        <button className="btn-dark headline-cancel" onClick={ closeHeadlineInput }>
          Cancel
        </button>
        <button className="btn-dark headline-save" type="submit">
          Save
        </button>
      </form>
    )
  }

  const changeHeadline = (event) => {
    event.preventDefault();

    const data = {
      ...user,
      headline: event.target.headline.value
    }

    axios.put(`/api/users/${user.id}`, data)
      .then((response) => {
        setUser({
          ...user,
          headline: data.headline
        })
        closeHeadlineInput();
      })
      .catch((error) => {
        console.log('PUT /api/users/[userId] failed, error: ', error);
      })
  }

  const closeHeadlineInput = (event) => {
    if (event) {
      event.preventDefault();
    }

    setState({
      ...state,
      headline: user.headline
    })

    $('.prof-info').css('grid-template-areas', `
      'username username'
      'headline headline'
      '. headline-change'
      'recent-posts .'
      'recent-comments .'
    `);
    $('.headline-form').css('display', 'none');
    $('.prof-info > .headline-change').show();
    $('.prof-info > h3').show();

  }

  const headlineButton = () => {
    if (user.headline.trim().length > 0) {
      return (
        <button className="btn-dark headline-change" onClick={ openHeadlineInput }>
          Change headline
        </button>
      )
    } else {
      return (
        <button className="btn-dark headline-change" onClick={ openHeadlineInput }>
          Add headline
        </button>
      )
    }
  }

  const trackHeadlineChange = (event) => {
    setState({
      ...state,
      headline: event.target.value
    });
  }

  return (
    <div className="container profile">
      <div className="prof-pic">
        <img src="/pic-placeholder-light.png" />
        <button className="btn-dark" onClick={ openPicturePanel }>Change picture</button>
      </div>
      <div className="prof-info">
        <h2>{ state.username }</h2>
        <h3>{ state.headline }</h3>
        { headlineInput() }
        { headlineButton() }
        <h4 className="recent-posts">Recent posts:</h4>
        <h4 className="recent-comments">Recent comments:</h4>
      </div>
      { picturePanel() }
    </div>
  )
}

export default withRouter(Profile)
