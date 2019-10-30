import React from 'react';
import logo from './logo.svg';
import './App.css';

import Posts from './components/Posts'

const header = () => {
  return <header><h2>Dashboard App</h2></header>
}

function App() {
  return (
    <div className="container">
      { header() }
      <Posts/>
    </div>
  );
}

export default App;
