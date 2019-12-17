import React, { Component } from 'react';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <>
        <h1>Memory Game</h1>
        <Game />
      </>
    )
  }
};

export default App;
