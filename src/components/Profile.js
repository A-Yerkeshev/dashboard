import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Profile(props) {
  const user = props.user;
  const setUser = props.setCurrentUser;

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
      picture: user.picture
    })
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
        <b>Max size: 100mb</b>
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

    const data = new FormData(event.target);

    if (!data) {
      $('#pic-panel > .error').text('Please, select image to upload');
      return;
    }

    // Add current user id to form data
    data.append('userId', state.id);

    axios.post('/profile/change-picture', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
      }
    })
    .then( (response) => {
      closePicturePanel();
    })
    .catch( (error) => {
      $('#pic-panel > .error').text('Failed to change image. Check your internet connection');
      console.log(error);
    });
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
      headline: event.target.headline.value,
      userId: state.id
    }

    axios.post('/profile/change-headline', data)
      .then( (response) => {
        setUser({
          ...user,
          headline: data.headline
        })
        closeHeadlineInput();
      })
      .catch( (error) => {
        console.log(error)
      })
  }

  const closeHeadlineInput = (event) => {
    if (event) {
      event.preventDefault();
    }

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
        <img src={ process.env.PUBLIC_URL + state.picture } />
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
