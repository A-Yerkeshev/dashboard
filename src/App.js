import React from 'react';
import logo from './logo.svg';
import './App.css';

import Posts from './components/Posts'

const header = () => {
  return <header>I am a header</header>
}

function App() {
  return (
    <div className="App">
      { header() }
      <h1>Dashboard application</h1>
      <Posts/>
    </div>
  );
}

export default App;
