import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Minesweeper!</h1>
        </header>
        <p className="App-intro">
          Hello World!
        </p>
          <div>
              Board Size:<input ></input>
          </div>
          <button>New Game</button>
      </div>

    );
  }
}

export default App;
