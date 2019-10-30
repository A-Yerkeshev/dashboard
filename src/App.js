import React from 'react';
import logo from './logo.svg';
import './App.css';

import Posts from './components/Posts'

const header = () => {
  return (
    <header>
      <h2>Dashboard App</h2>
    </header>
  )
}

const footer = () => {
  return (
    <footer>
      <span>Powered by <a href="https://reactjs.org/" target="_blank">React</a></span><br/>
      <span>Backend is simulated by <a href="https://jsonplaceholder.typicode.com/"
        target="_blank">JSONPlaceholder</a>
      </span><br/>
    </footer>
  )
}

function App() {
  return (
    <div className="container">
      { header() }
      <Posts/>
      { footer() }
    </div>
  );
}

export default App;
