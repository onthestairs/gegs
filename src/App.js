import React, { Component } from 'react';
import './App.css';
import CrosswordApp from './components/CrosswordApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="crosswordHolder">
          <CrosswordApp />
        </div>
      </div>
    );
  }
}

export default App;
